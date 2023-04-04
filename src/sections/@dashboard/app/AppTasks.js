import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// form
import { useForm, Controller } from "react-hook-form";
import db from "../../../firebase";
import { auth } from "../../../firebase";

// @mui
import {
  Card,
  Stack,
  Divider,
  Popover,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  FormControlLabel,
} from "@mui/material";
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTasks({ title, subheader, list, ...other }) {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    const res = [];
    // console.log("todos res iiiiiddd", auth.currentUser.uid);
    await db
      .collection("todos")
      .where("branchId", "==", auth.currentUser.uid)
      .get()
      .then((todos) => {
        todos.forEach((todo) => res.push(todo.data()));
      });
    console.log(res.length, "fetched from todos", res);
    console.log("todos res", res);
    console.log("todos-->");
    setTodos(res);
    return res;
  };
  useEffect(() => {
    getTodos();
  }, []);

  const { control } = useForm({
    defaultValues: {
      taskCompleted: ["2"],
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Controller
        name='taskCompleted'
        control={control}
        render={({ field }) => {
          const onSelected = (task) =>
            field.value.includes(task)
              ? field.value.filter((value) => value !== task)
              : [...field.value, task];
          if (todos.length === 0) return;
          return (
            <>
              {todos.map((todo) => (
                <TaskItem
                  key={todo.todoId}
                  todo={todo}
                  checked={field.value.includes(todo.todoId)}
                  onChange={() => field.onChange(onSelected(todo.todoId))}
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
};

function TaskItem({ todo, checked, onChange }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.log("MARK COMPLETE", todo.todoId);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.log("SHARE", todo.todoId);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.log("EDIT", todo.todoId);
  };

  const handleDelete = async () => {
    handleCloseMenu();
    const res = await db.collection("todos").doc(todo.todoId).delete();
    console.log("deleting from TaskItem", todo.todoId, res);
  };

  return (
    <Stack
      direction='row'
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: "text.disabled",
          textDecoration: "line-through",
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={todo.task}
        sx={{ flexGrow: 1, m: 0 }}
      />

      <IconButton
        size='large'
        color='inherit'
        sx={{ opacity: 0.48 }}
        onClick={handleOpenMenu}
      >
        <Iconify icon={"eva:more-vertical-fill"} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon={"eva:checkmark-circle-2-fill"} sx={{ mr: 2 }} />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon={"eva:share-fill"} sx={{ mr: 2 }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </Stack>
  );
}
