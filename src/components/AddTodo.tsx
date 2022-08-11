import { Button, Typography } from "@mui/material";
import { Box, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Todo } from "../data";
import { useAppDispatch } from "../redux/hooks";
import { addTodo } from "../redux/slices/todoSlice";

const categories = [
  {
    value: "REACT",
    label: "REACT",
  },
  {
    value: "EXERCISE",
    label: "EXERCISE",
  },
  {
    value: "CARDIO",
    label: "CARDIO",
  },
  {
    value: "SHOPPING",
    label: "SHOPPING",
  },
];

type TodoProps = {
  todo: Todo;
};

function AddTodo() {
  const dispatch = useAppDispatch();
  const today = new Date();
  const [todo, setTodo] = useState<Todo>({
    id: Math.floor(Math.random() * 100),
    complete: false,
    category: "REACT",
    title: "",
    description: "",
    date: today.toJSON().slice(0, 10),
  });

  //   useEffect(() => {
  //     setTodo({ ...todo, id: Math.floor(Math.random() * 1000) });
  //     console.log("randomized date");
  //   }, [todo.title]);

  function handleAddTodo() {
    console.log(todo);
    dispatch(addTodo(todo));
    setTodo({
      ...todo,
      id: Math.floor(Math.random() * 100),
      title: "",
      description: "",
      category: "REACT",
    });
  }

  return (
    <Box
      component="form"
      border={1}
      sx={{
        "& > :not(style)": { m: 1 },
      }}
    >
      <Typography align="center">Add Todo</Typography>
      <Button onClick={() => handleAddTodo()}>Submit</Button>

      <TextField
        id="outlined-select-category"
        label="Title"
        value={todo.title}
        onChange={(e) => {
          setTodo({ ...todo, title: e.target.value });
        }}
      >
        Title
      </TextField>
      <TextField
        id="outlined-select-category"
        select
        label="Category"
        value={todo.category}
        onChange={(e) => {
          setTodo({ ...todo, category: e.target.value });
        }}
        sx={{ minWidth: "20vh" }}
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-enter-description"
        label="Description"
        value={todo.description}
        onChange={(e) => {
          setTodo({ ...todo, description: e.target.value });
        }}
      >
        Description
      </TextField>
    </Box>
  );
}

export default AddTodo;
