import PhysicianData from "./pages/PhysicianData";
import PatientList from "./pages/PatientList";

import { useState } from "react";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Layout from "./layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

//TODO: use useState to render logged in or not logged in

export default function () {
  const [loggedIn, setLoggedIn] = useState(true);

  function handleLogin() {
    setLoggedIn(true);
  }

  //   <Button onClick={handleToggle}>Show backdrop</Button>
  // <Backdrop
  //   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //   open={open}
  //   onClick={handleClose}
  // >
  //   <CircularProgress color="inherit" />
  // </Backdrop>

  if (loggedIn) {
    return (
      <Layout>
        <PhysicianData />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-patients" element={<PatientList />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    );

    // if (loggedIn) {
    //   return (
    //     <Layout>
    //       <PatientList />
    //     </Layout>
    //   );
  } else {
    return (
      <div>
        <Button
          variant="contained"
          endIcon={<LoginIcon />}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    );
  }
}
