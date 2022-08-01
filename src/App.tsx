import PhysicianData from "./pages/PhysicianData";
import PatientList from "./pages/PatientList";
import PatientLabs from "./pages/PatientLabs";
import { useState } from "react";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

//TODO: use useState to render logged in or not logged in

export default function () {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin() {
    setLoggedIn(true);
  }

  if (loggedIn) {
    return (
      <div>
        <PhysicianData />
        <PatientList />
        <PatientLabs />
      </div>
    );
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
