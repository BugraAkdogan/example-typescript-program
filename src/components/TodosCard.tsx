import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Snackbar,
  Switch,
  ToggleButton,
  Typography,
} from "@mui/material";
import { Todo } from "../data";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch } from "../redux/hooks";
import { toggleComplete, deleteTodo } from "../redux/slices/todoSlice";

type TodoCardProps = {
  todo: Todo;
};

export default function TodosCard(props: TodoCardProps) {
  const {
    todo: { id, complete, category, title, description, date },
  } = props;

  const dispatch = useAppDispatch();

  function handleDeleteTodo(id: number) {
    dispatch(deleteTodo(id));
    // TODO: Makes no sense here
    <Snackbar autoHideDuration={6000}>
      <Alert severity="success" sx={{ width: "100%" }}>
        Deleted Successfully!
      </Alert>
    </Snackbar>;
  }

  function handleToggleTodo(id: number) {
    dispatch(toggleComplete(id));
  }

  return (
    //TODO: toggle, delete todos. Toastify messages (MUI Snackbar)

    <Card
      sx={{ backgroundColor: complete ? "lightgreen" : "pink" }}
      elevation={5}
    >
      <CardHeader
        avatar={<Avatar> {category[0].toUpperCase()}</Avatar>}
        title={<Typography>{title}</Typography>}
        subheader={
          <Typography variant="caption">
            Category: {category}{" "}
            {complete && <CheckCircleIcon color="success" />}
            {!complete && <CancelIcon color="error" />}
          </Typography>
        }
      />

      <IconButton
        aria-label="delete"
        onClick={() => {
          handleDeleteTodo(id);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Switch
        checked={complete}
        onChange={() => {
          handleToggleTodo(id);
        }}
      />

      <Typography variant="caption">{date}</Typography>
      <CardContent>
        <Typography variant="body2" color="primary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
