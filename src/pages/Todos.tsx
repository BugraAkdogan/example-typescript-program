import Masonry from "@mui/lab/Masonry";
import TodosCards from "../components/TodosCards";
import todos from "../data/json/todos.json";

export type todo = {
  id: number;
  title: string;
  category: string;
  description: string;
  completed: boolean;
};

export default function Todos() {
  return (
    <Masonry columns={3} spacing={3}>
      {todos.length > 0 &&
        todos.map((todo) => (
          <TodosCards
            id={todo.id}
            title={todo.title}
            category={todo.category}
            description={todo.description}
            completed={todo.complete}
          />
        ))}
      {todos.length === 0 && <h2>No todos found...</h2>}
    </Masonry>
  );
}
