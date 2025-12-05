import { useLocalStorage } from "@/hooks/use-local-storage";
import type { TodoModel } from "@/models/todo";

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<TodoModel[]>("todos", []);

  const handleAdd = (todo: TodoModel) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };
  
  const handleAllCompleted = () => {
    setTodos((prev) => prev.map((t) => ({ ...t, completed: !t.completed })));
  }

  const handleEdit = (
    id: number,
    updates: { title: string; description?: string },
  ) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  };

  return {
    todos,
    handleAdd,
    handleDelete,
    handleCompleted,
    handleEdit,
    handleAllCompleted
  };
}
