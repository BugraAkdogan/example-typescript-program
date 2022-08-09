import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { todo } from "../pages/Todos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function TodosCards({
  id,
  title,
  description,
  category,
  completed,
}: todo) {
  return (
    <div>
      <Card elevation={5}>
        <CardHeader
          avatar={<Avatar> {category[0].toUpperCase()}</Avatar>}
          title={
            <Typography>
              {title}
              {completed ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CancelIcon color="error" />
              )}
            </Typography>
          }
          subheader={
            <>
              <Typography variant="caption">Category: {category}</Typography>
            </>
          }
        />

        <CardContent>
          <Typography
            variant="body2"
            color={completed ? "Green" : "red"}
            style={{ wordWrap: "break-word" }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
