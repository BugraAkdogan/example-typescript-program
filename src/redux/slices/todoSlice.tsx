import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Todo } from "../../data";

type TodoSlice = {
  todos: Array<Todo>;
};

const initialState: TodoSlice = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Array<Todo>>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.complete = !todo.complete;
      }
    },
  },
});

export const { setTodos, addTodo, deleteTodo, toggleComplete } =
  todoSlice.actions;
export default todoSlice.reducer;
