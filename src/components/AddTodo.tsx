import { Box, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Todo } from "../data";

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

function AddTodo() {
  const [category, setCategory] = useState("");

  function handleAddTodo(todo: Todo) {
    console.log(todo);
  }

  return (
    <>
      <Box component="form">
        <div>
          <div>Add Todo Form Goes here</div>
          <TextField
            id="outlined-select-category"
            select
            label="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            helperText="Please select category"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
    </>
  );
}

export default AddTodo;
