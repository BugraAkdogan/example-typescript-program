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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const errorInFields = (): boolean => {
    return (
      title.length === 0 || category.length === 0 || description.length === 0
    );
  };

  const resetState = () => {
    setTitle("");
    setDescription("");
    setCategory("");
  };

  function handleAddTodo() {
    const addTime = new Date();
    const todo: Todo = {
      title,
      description,
      category,
      id: addTime.getTime(),
      complete: false,
      date: addTime.toLocaleDateString(),
    };

    dispatch(addTodo(todo));
    resetState();
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
      <Button disabled={errorInFields()} onClick={() => handleAddTodo()}>
        Submit
      </Button>

      <TextField
        id="outlined-select-category"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={title.length === 0}
        helperText={title.length === 0 ? "Title is required" : ""}
      >
        Title
      </TextField>
      <TextField
        id="outlined-select-category"
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        Description
      </TextField>
    </Box>
  );
}

export default AddTodo;
