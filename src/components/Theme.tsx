import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Rating,
  Drawer,
  Divider,
  List,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { DrawerListItem } from "./DrawerListItem";
import { deepOrange } from "@material-ui/core/colors";

import AppLogo from "../assets/img/logo192.png";
import { Link } from "react-router-dom";

export type DrawerEntry = {
  title: string;
  to: string;
  icon: JSX.Element;
};

const drawerWidth = 240;

function Theme({ children }: { children: React.ReactNode }) {
  const {
    NAME: name,
    POSITION: position,
    PHYSICIAN: isPhysician,
  } = useSelector(
    (state: RootState) =>
      state.user.data || { NAME: "None", POSITION: "None", PHYSICIAN: "None" }
  );

  const drawerEntires: Array<DrawerEntry> = [
    { title: "Dashboard", to: "/", icon: <DashboardIcon /> },
    { title: "My Patients", to: "/my-patients", icon: <LocalHospitalIcon /> },
    { title: "To-Do List", to: "/todos", icon: <FormatListNumberedIcon /> },
    { title: "Logout", to: "/logout", icon: <PowerSettingsNewIcon /> },
  ];

  function handleLogoClick() {
    <a href="/">Link</a>;
  }

  return (
    <Box sx={{ flexGrow: 1 }} display="flex">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 1 }}>
            {name.charAt(0)}
          </Avatar>
          <Typography variant="body2">
            {`${name} (${position} - ${
              isPhysician.toLowerCase() === "yes"
                ? "Physician"
                : "Not Physician"
            })`}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h5">MPAGE HUB</Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2">Your Rating:</Typography>
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <Rating name="read-only" value={2} readOnly />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            elevation: 24,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          component="div"
          sx={{
            maxHeight: 64,
            maxWidth: 64,
            alignSelf: "center",
          }}
        >
          <Link to="/">
            <img src={AppLogo} alt="logo" width="100%" />
          </Link>
        </Box>
        <Divider />
        <List>
          {drawerEntires.map(({ title, icon, to }, i) => (
            <DrawerListItem
              key={`${title}-${i}`}
              title={title}
              icon={icon}
              to={to}
            />
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div>{children}</div>
      </Box>
    </Box>
  );
}

export default Theme;
