import { Todo } from "@/components/todo";
import type { TodoModel } from "@/models/todo";

type ListTodoProps = {
  todos: TodoModel[];
  onDelete: (id: number) => void;
  onCompleted: (id: number) => void;
};

export function ListTodo({ todos, onDelete, onCompleted }: ListTodoProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">
        No todos yet — add your first one above!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={onDelete} onCompleted={onCompleted} />
      ))}
    </div>
  );
}
