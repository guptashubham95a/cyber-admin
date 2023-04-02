import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
import Iconify from "../components/iconify";
// sections
import { LoginForm } from "../sections/auth/login";
import { useState } from "react";
import Typewriter from "typewriter-effect/dist/core";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");
  const [isLogin, setIsLogin] = useState(true);
  const changeLoginSate = () => {
    console.log("isLogin");
    setIsLogin(!isLogin);
  };
  return (
    <>
      <Helmet>
        <title> Login | Cyber Admin </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
              {/* <Typewriter
                options={{
                  strings: [
                    " Hi, Welcome Back to Cyber Admin",
                    " Analyze tips in Optimistic way..",
                    "Developed by Rgit Students",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              /> */}
              Hi, Welcome Back to Cyber Admin
            </Typography>
            {/* <img
              src='/assets/illustrations/illustration_login.png'
              alt='login'
            /> */}
          </StyledSection>
        )}

        <Container maxWidth='sm'>
          <StyledContent>
            <Typography variant='h4' gutterBottom>
              {isLogin ? "Sign in" : "Register"} to Cyber Admin
            </Typography>

            <Typography variant='body2' sx={{ mb: 5 }}>
              {!isLogin ? "Sign in " : "Don’t have an account? "}
              <Link onClick={() => setIsLogin(!isLogin)} variant='subtitle2'>
                Get started
              </Link>
            </Typography>

            <Stack direction='row' spacing={2}>
              <Button fullWidth size='large' color='inherit' variant='outlined'>
                <Iconify
                  icon='eva:google-fill'
                  color='#DF3E30'
                  width={22}
                  height={22}
                />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant='body2' sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            <LoginForm isLogin={isLogin} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
