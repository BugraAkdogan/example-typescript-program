import Masonry from "@mui/lab/Masonry";
import TodosCard from "../components/TodosCards";
import todos from "../data/json/todos.json";

export type Todo = {
  id: number;
  title: string;
  category: string;
  description: string;
  complete: boolean;
};

export default function Todos() {
  return (
    <Masonry columns={3} spacing={3}>
      {todos.length > 0 && todos.map((todo) => <TodosCard todo={todo} />)}
      {todos.length === 0 && <h2>No todos found...</h2>}
    </Masonry>
  );
}
