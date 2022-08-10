import Masonry from "@mui/lab/Masonry";
import { Box, Card, MenuItem, TextField } from "@mui/material";

import AddTodo from "../components/AddTodo";
import TodosCard from "../components/TodosCard";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function Todos() {
  const todos = useAppSelector((state) => state.todoList.todos);

  return (
    <Box>
      <AddTodo />
      <Masonry columns={4} spacing={1}>
        {todos.length > 0 && todos.map((todo) => <TodosCard todo={todo} />)}
        {todos.length === 0 && <h2>No todos found...</h2>}
      </Masonry>
    </Box>
  );
}
