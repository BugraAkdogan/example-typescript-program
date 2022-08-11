import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

function Dashboard() {
  const patientCount = useAppSelector(
    (state) => state.patientList.patients.length
  );
  const todoCount = useAppSelector((state) => state.todoList.todos.length);

  return (
    <Box justifyContent="center" sx={{ display: "flex", flexWrap: "wrap" }}>
      <Typography
        sx={{ flex: "1 1 100%", paddingBottom: 2 }}
        align="center"
        variant="h2"
      >
        Dashboard
      </Typography>

      <Card elevation={5} sx={{ minWidth: 275, padding: 2, margin: 2 }}>
        <CardContent>
          <Typography
            align="center"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            MY PATIENTS
          </Typography>
          <Typography variant="h5" component="div">
            You currently have
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {patientCount} patients
          </Typography>
          <Typography variant="body2">
            as of {new Date().toLocaleDateString()}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to="/my-patients">
            Go To Patients
          </Button>
        </CardActions>
      </Card>
      <Card elevation={5} sx={{ minWidth: 275, padding: 2, margin: 2 }}>
        <CardContent>
          <Typography
            align="center"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            MY TO-DO LIST
          </Typography>
          <Typography variant="h5" component="div">
            You currently have
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {todoCount} to-dos
          </Typography>
          <Typography variant="body2">
            as of {new Date().getHours()}:{new Date().getMinutes()}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to="/todos">
            Go To Todos
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Dashboard;
