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
  Badge,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { useState } from "react";

export type DrawerEntry = {
  title: string;
  to: string;
  icon: JSX.Element;
  invisible: boolean;
  notification: number;
};

const drawerWidth = 240;

function Theme({ children }: { children: React.ReactNode }) {
  //TODO: Add rating names "bad", "ok", "good"
  const [rating, setRating] = useState<number | null>(2);
  const {
    NAME: name,
    POSITION: position,
    PHYSICIAN: isPhysician,
  } = useSelector(
    (state: RootState) =>
      state.user.data || { NAME: "None", POSITION: "None", PHYSICIAN: "None" }
  );

  const drawerEntires: Array<DrawerEntry> = [
    {
      title: "Dashboard",
      to: "/",
      icon: <DashboardIcon />,
      invisible: true,
      notification: 0,
    },
    {
      title: "My Patients",
      to: "/my-patients",
      icon: <LocalHospitalIcon />,
      invisible: false,
      notification: useSelector(
        (state: RootState) => state.patientList.patients.length
      ),
    },
    {
      title: "To-Do List",
      to: "/todos",
      icon: <FormatListNumberedIcon />,
      invisible: false,
      notification: useSelector(
        (state: RootState) => state.todoList.todos.length
      ),
    },
    {
      title: "Logout",
      to: "/logout",
      icon: <PowerSettingsNewIcon />,
      invisible: true,
      notification: 0,
    },
  ];

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
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(e, newRating) => {
                setRating(newRating);
              }}
            />
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
          {drawerEntires.map(
            ({ title, icon, to, invisible, notification }, i) => (
              <DrawerListItem
                key={`${title}-${i}`}
                title={title}
                icon={icon}
                to={to}
                invisible={invisible}
                notification={notification}
              />
            )
          )}
          {/* <ListItem
            disablePadding
            sx={{ display: "block" }}
            button
            component={Link}
            to="/"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "initial",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: 1 }} />
              <Badge badgeContent={4} color="primary" />
            </ListItemButton>
          </ListItem>*/}
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
