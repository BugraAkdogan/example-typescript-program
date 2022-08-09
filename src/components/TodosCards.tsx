import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Todo } from "../pages/Todos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

type TodoCardProps = {
  todo: Todo;
};

export default function TodosCard(props: TodoCardProps) {
  const {
    todo: { complete, category, title, description },
  } = props;
  return (
    <Card
      sx={{ backgroundColor: complete ? "lightgreen" : "pink" }}
      elevation={5}
    >
      <CardHeader
        avatar={<Avatar> {category[0].toUpperCase()}</Avatar>}
        title={
          <Typography>
            {title}
            {complete && <CheckCircleIcon color="success" />}
            {!complete && <CancelIcon color="error" />}
          </Typography>
        }
        subheader={
          <Typography variant="caption">Category: {category}</Typography>
        }
      />

      <CardContent>
        <Typography
          variant="body2"
          color={complete ? "green" : "red"}
          style={{ wordWrap: "break-word" }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
