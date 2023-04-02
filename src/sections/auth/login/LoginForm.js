import { useState } from "react";
import { useNavigate } from "react-router-dom";
import USERLIST from "../../../_mock/user";
import { getUserData } from "../../../_mock/user";

// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";

import { auth } from "../../../firebase";
import db from "../../../firebase";
import { notification } from "../../../notification";
import { Store } from "react-notifications-component";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { random } from "lodash";

// ----------------------------------------------------------------------

export default function LoginForm({ isLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // add validations...
    // store.addNotification({
    //   ...notification,
    //   type: "warning",
    //   message: "error.message",
    // });
    // try {
    // const res = await auth.createUserWithEmailAndPassword(email, password);
    // const res = await auth.signInWithEmailAndPassword(email, password);
    // store.addNotification({
    //   ...notification,
    //   message: "Signed-In Successfully.",
    // });
    // console.log(res);
    // } catch (error) {
    // store.addNotification({
    //   ...notification,
    //   type: "warning",
    //   message: error.message,
    // });
    //   console.log(error.message);
    // }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const email = formData.email;
    const password = formData.password;
    const confirm_password = formData.confirm_password;
    if (isLogin) {
      // handle validations....
    } else if (password !== confirm_password) {
      Store.addNotification({
        ...notification,
        type: "danger",
        message: "Password should match.",
      });
      return;
    }

    // add query to login or register based on isLogin var
    try {
      if (isLogin) {
        const res = await auth.signInWithEmailAndPassword(email, password);
        console.log("signInWithEmailAndPassword", res.user.uid);
        Store.addNotification({
          ...notification,
          message: "Signed-In Successfully.",
        });

        // Script used for adding dummy data to database.

        var tips = USERLIST;
        const dummyBranches = [
          "DN NAGAR",
          "VERSOVA",
          "GOREGAON",
          "MALAD",
          "ANDHERI",
          "JUHU Versova",
          "KANDIVALI",
        ];
        const dummyTask = [
          "Take reports from tipper or evidence",
          "To finish critical tips",
          "Transfer irrelevant cases",
          "Reject any false tips",
          "look into drugs trade info",
        ];
        // // const a = await db.collection("tips").add({ uid: res.user.uid });
        // var i = 0;
        // const limit = dummyTask.length;
        // for (i = 0; i < limit; i++) {
        //   // 1.) for adding tips data
        //   //   // delete tips[i].avatarUrl
        //   // const r = await db.collection("tips").add({
        //   //     ...tips[i],
        //   //     branchId: res.user.uid,
        //   //     isTransferred: false,
        //   //     transferredTo: res.user.uid,
        //   // });
        //   //   await r.update({ id: r.id });
        //   //   console.log(i, "->data added.");

        //   // 2.) for adding authorities data
        //   // authority Id is doc id instead of authID just for dummy data
        //   //   const r = await db.collection("todos").add({
        //   //     id: res.user.uid,
        //   //     name: dummyBranches[i],
        //   //     solvedCases: random(50, 500, false),
        //   //     pendingCases: random(50, 500, false),
        //   //     feedbacks: random(50, 500, false),
        //   //   });
        //   //   await r.update({ id: r.id });
        //   //   console.log(i, "->data added.");
        //   // }

        //   // 3.) for adding todos data
        //   const r = await db.collection("todos").add({
        //     branchId: res.user.uid,
        //     task: dummyTask[i],
        //     isDone: false,
        //   });
        //   await r.update({ todoId: r.id });
        //   console.log(i, "->data added.");
        // }
        await getUserData();
        navigate("/dashboard", { replace: true });
      } else {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        console.log("createUserWithEmailAndPassword", res.user.uid);
        const a = await db.collection("branch").add({ uid: res.user.uid });
        // console.log("data added", a.id);
      }

      navigate("/dashboard", { replace: true });
      // const res = await auth.signInWithEmailAndPassword(email, password);
      // store.addNotification({
      //   ...notification,
      //   message: "Signed-In Successfully.",
      // });
      // console.log(res);
    } catch (error) {
      Store.addNotification({
        ...notification,
        type: "warning",
        message: error.message,
      });
      console.log(error.message);
    }
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          onChange={handleFormChange}
        />

        <TextField
          name='password'
          label='Password'
          id='password'
          onChange={handleFormChange}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {!isLogin ? (
          <TextField
            name='confirm_password'
            label='Confirm Password'
            onChange={handleFormChange}
            id='confirm_password'
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          ""
        )}
      </Stack>

      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ my: 2 }}
      >
        <Checkbox name='remember' label='Remember me' />
        <Link variant='subtitle2' underline='hover'>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        onClick={handleFormSubmit}
      >
        {isLogin ? "Login" : "Register"}
      </LoadingButton>
    </>
  );
}
