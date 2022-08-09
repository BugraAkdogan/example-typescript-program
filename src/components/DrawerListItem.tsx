import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { DrawerEntry } from "./Layout";

export type DrawerListItemProps = DrawerEntry & { key: string | number };

export const DrawerListItem = ({
  to,
  title,
  icon,
  key,
}: DrawerListItemProps) => (
  <ListItem key={key} disablePadding sx={{ display: "block" }}>
    <Link to={to}>
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
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: 1 }} />
      </ListItemButton>
    </Link>
  </ListItem>
);
