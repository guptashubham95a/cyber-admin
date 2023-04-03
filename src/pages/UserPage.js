import { Helmet } from "react-helmet-async";
import { filter, random } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import db from "../firebase";
import { getTips, modifyTipStatus } from "../service/api";
// mock
import users from "../_mock/user";
import { getUserData } from "../_mock/user";
import { element } from "prop-types";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "contact", label: "Contact", alignRight: false },
  { id: "place", label: "Place", alignRight: false },
  { id: "id", label: "Tip Id", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "surveyed", label: "Surveyed", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "score", label: "Tip-Off Score", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [USERLIST, setUSERLIST] = useState([]);
  const [selectedTipId, setSelectedTipId] = useState("");

  const handleUserDataChange = async (id, status) => {
    const index = USERLIST.findIndex((element) => {
      return element.id === id;
    });
    USERLIST[index].status = status;
    setOpen(false);
    setUSERLIST([...USERLIST]);
    console.log("handleUserDataChange modifyTipStatus", id, status);
    await modifyTipStatus({
      _id: id,
      status: status,
    });
    console.log("changed status", id, status);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const getUserData = async () => {
    const res = [];
    await db
      .collection("tips")
      .get()
      .then((tips) => {
        tips.forEach((tip) => res.push(tip.data()));
      });
    console.log(res.length, "fetched from tips", res);
    console.log("UserList res", res);
    setUSERLIST(res);
    console.log("USERLIST-->", USERLIST);
    return res;
  };

  const getTipsFromMongoDb = async () => {
    const res = await getTips();
    // console.log("gotTipsFromMongoDb-->", res);
    const tips = [
      ...res.map((tip, index) => {
        const t =
          tip.score >= "0" && tip.score <= "9" ? Math.round(tip.score) : 0;
        return {
          id: tip._id,
          Contact: tip.contact,
          avatarUrl: `/assets/images/avatars/avatar_${(index + 1) % 10}.jpg`,
          score: t,
          status: tip.status ?? "pending",
          title: tip.title,
          crimeType: tip.typeofcrime,
          description: tip.desc,
          surveyed: t > "0" ? "YES" : "NO",
          contact: tip.contact,
          location: tip.location,
        };
      }),
    ];
    setUSERLIST(tips);
    console.log("USERLIST-->", USERLIST);
    console.log("gotTipsFromMongoDb-->", tips);
  };
  useEffect(() => {
    // console.log("useEffect getUserData");
    // const res = getUserData();
    console.log("MongoDb getTipsFromMongoDb");
    const r = getTipsFromMongoDb();

    // const res = modifyTipStatus({
    //   _id: "633fa5b8ff859612678d9111",
    //   status: "Solved",
    // });
    // console.log("After useEffect getUserData", USERLIST);
  }, []);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Tips | Cyber Admin </title>
      </Helmet>

      <Container>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={5}
        >
          <Typography variant='h4' gutterBottom>
            All Tips and Reports
          </Typography>
          <Button
            variant='contained'
            startIcon={<Iconify icon='eva:plus-fill' />}
          >
            New Tips
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        contact,
                        description,
                        status,
                        score,
                        place,
                        avatarUrl,
                        surveyed,
                      } = row;
                      const selectedUser = selected.indexOf(contact) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role='checkbox'
                          selected={selectedUser}
                          onClick={() => {
                            setSelectedTipId(id);
                            console.log("onClick working", id);
                          }}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, contact)}
                            />
                          </TableCell>

                          <TableCell component='th' scope='row' padding='none'>
                            <Stack
                              direction='row'
                              alignItems='center'
                              spacing={2}
                            >
                              <Avatar alt={contact} src={avatarUrl} />
                              <Typography variant='subtitle2' noWrap>
                                {contact}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align='left'>{place}</TableCell>
                          <TableCell align='left'>{id}</TableCell>

                          <TableCell align='left'>{description}</TableCell>

                          <TableCell align='left'>{surveyed}</TableCell>

                          <TableCell align='left'>
                            <Label
                              color={
                                (status === "rejected" && "error") ||
                                (status === "Successfully Solved" &&
                                  "success") ||
                                "warning"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>
                          <TableCell align='left'>{score}</TableCell>
                          <TableCell align='right'>
                            <IconButton
                              size='large'
                              color='inherit'
                              onClick={handleOpenMenu}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                  {/* <Popover
                    open={Boolean(open)}
                    anchorEl={open}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      sx: {
                        p: 1,
                        width: 140,
                        "& .MuiMenuItem-root": {
                          px: 1,
                          typography: "body2",
                          borderRadius: 0.75,
                        },
                      },
                    }}
                  >
                    <MenuItem
                      sx={{ color: "green" }}
                      onClick={() => {
                        handleUserDataChange(
                          selectedTipId,
                          "Successfully Solved"
                        );
                        console.log("Solved");
                      }}
                    >
                      <Iconify
                        icon={"mdi:tick-circle"}
                        style={{ color: "green" }}
                        sx={{ mr: 2 }}
                      />
                      Solved
                    </MenuItem>

                    <MenuItem
                      sx={{ color: "blue" }}
                      onClick={() => {
                        handleUserDataChange(selectedTipId, "In Progress");
                        console.log("In Progress");
                      }}
                    >
                      <Iconify
                        icon={"mdi:progress-clock"}
                        // style={{ color: "yellow" }}
                        sx={{ mr: 2 }}
                      />
                      In Progress
                    </MenuItem>
                    <MenuItem
                      sx={{ color: "error.main" }}
                      onClick={() => {
                        handleUserDataChange(selectedTipId, "rejected");
                        console.log("rejected");
                      }}
                    >
                      <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
                      Reject
                    </MenuItem>
                  </Popover> */}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant='h6' paragraph>
                            Not found
                          </Typography>

                          <Typography variant='body2'>
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          sx={{ color: "green" }}
          onClick={() => {
            handleUserDataChange(selectedTipId, "Successfully Solved");
            console.log("Solved");
          }}
        >
          <Iconify
            icon={"mdi:tick-circle"}
            style={{ color: "green" }}
            sx={{ mr: 2 }}
          />
          Solved
        </MenuItem>

        <MenuItem
          sx={{ color: "blue" }}
          onClick={() => {
            handleUserDataChange(selectedTipId, "In Progress");
            console.log("In Progress");
          }}
        >
          <Iconify
            icon={"mdi:progress-clock"}
            // style={{ color: "yellow" }}
            sx={{ mr: 2 }}
          />
          In Progress
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            handleUserDataChange(selectedTipId, "rejected");
            console.log("rejected");
          }}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Reject
        </MenuItem>
      </Popover>
    </>
  );
}
