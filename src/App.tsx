import PatientList from "./pages/PatientList";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { CclReturnData, getUserData, User } from "./data";
import {
  toggleLoading as toggleUserLoading,
  setUser,
} from "./redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Todos from "./pages/Todos";
import Theme from "./components/Theme";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const userLoading = useAppSelector((state) => state.user.loading);

  function handleLogin() {
    dispatch(toggleUserLoading());
    getUserData(providerPid)
      .then((res) => {
        const { error, msg } = validateGetUser(res);
        if (error) {
          console.warn(msg);
          return;
        } else dispatch(setUser(res.DATA[0]));
      })
      .then((err) => console.error(err))
      .finally(() => dispatch(toggleUserLoading()));
  }

  if (userLoading) {
    return <CircularProgress />;
  }

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        color="text.primary"
        sx={{
          flexDirection: "column",
          backgroundColor: "lightblue",
        }}
      >
        <Typography variant="h5" component="h1">
          Please Login or Register
        </Typography>
        <Box padding={2}>
          <Button
            sx={{ padding: 2, margin: 1 }}
            variant="contained"
            endIcon={<LoginIcon />}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            sx={{ padding: 2, margin: 1 }}
            variant="contained"
            endIcon={<LoginIcon />}
            onClick={handleLogin}
          >
            Register
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Theme>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-patients" element={<PatientList />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </Theme>
    </BrowserRouter>
  );
}

function validateGetUser(res: CclReturnData<User>): {
  error: boolean;
  msg?: string;
} {
  if (!res.DATA) {
    return { error: true, msg: "no valid data was found for the user" };
  }
  if (res.DATA.length === 0) {
    return { error: true, msg: "there was no data for the user" };
  }
  if (res.DATA.length > 1) {
    return {
      error: true,
      msg: "more than one user was found; was expecting only one",
    };
  }
  return { error: false };
}

export default App;
