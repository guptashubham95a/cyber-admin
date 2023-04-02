import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const data = [
    {
      id: faker.datatype.uuid(),
      title: "Violence - Goregaon(w)",
      description:
        "Aggravated assault upon a police officer or a peace officer",
      image: `/assets/images/covers/cover_${1}.jpg`,
      postedAt: faker.date.recent(),
    },
    {
      id: faker.datatype.uuid(),
      title: "Cyber Crime - DN Nagar",
      description: "Welfare fraud in bank",
      image: `/assets/images/covers/cover_${2}.jpg`,
      postedAt: faker.date.recent(),
    },
    {
      id: faker.datatype.uuid(),
      title: "Terrorism or Illegal activity",
      description: "Criminal use of a chemical weapon or biological weapon",
      image: `/assets/images/covers/cover_${3}.jpg`,
      postedAt: faker.date.recent(),
    },
    {
      id: faker.datatype.uuid(),
      title: "Corruption - Malad",
      description: "Money bribery to government officials during raid",
      image: `/assets/images/covers/cover_${4}.jpg`,
      postedAt: faker.date.recent(),
    },
    {
      id: faker.datatype.uuid(),
      title: "Robbery - DN Nagar",
      description: "Mobile stolen in hospital",
      image: `/assets/images/covers/cover_${5}.jpg`,
      postedAt: faker.date.recent(),
    },
  ];
  return (
    <>
      <Helmet>
        <title> Dashboard | Cyber Admin </title>
      </Helmet>

      <Container maxWidth='xl'>
        <Typography variant='h4' sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title='Tips In-Progress'
              total='4651'
              icon={"ant-design:fund-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title='Tips Rejected by Authorities'
              total='91'
              color='warning'
              icon={"ant-design:close-square-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title='Solved Successfully'
              total='71'
              color='success'
              icon={"ant-design:check-square-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title='Positive Responses till now'
              total={234}
              color='info'
              icon={"ant-design:like-filled"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title='Tips by categories'
              subheader='(+43%) than last year'
              chartLabels={[
                "01/01/2022",
                "02/01/2022",
                "03/01/2022",
                "04/01/2022",
                "05/01/2022",
                "06/01/2022",
                "07/01/2022",
                "08/01/2022",
                "09/01/2022",
                "10/01/2022",
                "11/01/2022",
                "12/01/2022",
                "01/01/2023",
                "02/01/2023",
              ]}
              chartData={[
                {
                  name: "Cyber Crime",
                  type: "column",
                  fill: "solid",
                  data: [
                    23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 22, 37, 21,
                  ],
                },
                {
                  name: "Violence",
                  type: "area",
                  fill: "gradient",
                  data: [
                    44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 43, 21, 41,
                  ],
                },
                {
                  name: "Illegal Acitivites",
                  type: "line",
                  fill: "solid",
                  data: [
                    30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 45, 35, 64,
                  ],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title='% of cases solved'
              chartData={[
                { label: "Cyber Crime", value: 1134 },
                { label: "Illegal Acitivites", value: 995 },
                { label: "Violence", value: 695 },
                { label: "Others", value: 591 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title='Comparision by Location'
              subheader='(+43%) than last year'
              chartData={[
                { label: "Rajasthan", value: 79 },
                { label: "Odisha", value: 48 },
                { label: "Bhopal", value: 120 },
                { label: "Assam", value: 190 },
                { label: "Bihar", value: 440 },
                { label: "Gujarat", value: 480 },
                { label: "Goa", value: 690 },
                { label: "Punjab", value: 699 },
                { label: "Delhi", value: 820 },
                { label: "Mumbai", value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title='Current Subject'
              chartLabels={[
                "Sensitive Data",
                "corruption bribe",
                "Drugs trade",
                "Domestic Violence",
                "Money Stolen",
                "Misconduct",
              ]}
              chartData={[
                { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(
                () => theme.palette.text.secondary
              )}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title='News Update'
              list={[...data]}
              // list={[...Array(5)].map((_, index) => ({
              //   id: faker.datatype.uuid(),
              //   title: faker.name.jobTitle(),
              //   description: faker.name.jobTitle(),
              //   image: `/assets/images/covers/cover_${index + 1}.jpg`,
              //   postedAt: faker.date.recent(),
              // }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title='Tips Timeline'
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  "10+ Cybercrime reported..",
                  "12 cases has be solved successfully.",
                  "9 illegal activites reported.",
                  "3 misconduct reported",
                  "7+ reports got rejected",
                ][index],
                type: `order${index + 1}`,
                time: faker.date.recent(2),
              }))}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title='Traffic by Site'
              list={[
                {
                  name: "FaceBook",
                  value: 323234,
                  icon: (
                    <Iconify
                      icon={"eva:facebook-fill"}
                      color='#1877F2'
                      width={32}
                    />
                  ),
                },
                {
                  name: "Google",
                  value: 341212,
                  icon: (
                    <Iconify
                      icon={"eva:google-fill"}
                      color='#DF3E30'
                      width={32}
                    />
                  ),
                },
                {
                  name: "Linkedin",
                  value: 411213,
                  icon: (
                    <Iconify
                      icon={"eva:linkedin-fill"}
                      color='#006097'
                      width={32}
                    />
                  ),
                },
                {
                  name: "Twitter",
                  value: 443232,
                  icon: (
                    <Iconify
                      icon={"eva:twitter-fill"}
                      color='#1C9CEA'
                      width={32}
                    />
                  ),
                },
              ]}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title='Tasks'
              list={[
                { id: "1", label: "To finish critical tips " },
                { id: "2", label: "Transfer irrelevant cases" },
                { id: "3", label: "Take reports from tipper or evidence" },
                { id: "4", label: "Reject any false tips" },
                { id: "5", label: "look into drugs trade info" },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
