import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import type { TodoModel } from "@/models/todo";

type TodoProps = {
  todo: TodoModel;
  onDelete: (id: number) => void;
  onCompleted: (id: number) => void;
};

export function Todo({ todo, onDelete, onCompleted }: TodoProps) {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>
          {todo.title} {todo.completed ? "(Done)" : "(Not Done)"}
        </ItemTitle>

        {todo.description && (
          <ItemDescription>{todo.description}</ItemDescription>
        )}

        <ItemFooter>
          Created at {new Date(todo.createdAt).toLocaleString()}
        </ItemFooter>
      </ItemContent>

      <ItemActions>
        <Button variant="outline" size="sm" onClick={() => onCompleted(todo.id)}>
          {todo.completed ? "Mark as Undone" : "Mark as Done"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => onDelete(todo.id)}>
          Delete
        </Button>
      </ItemActions>
    </Item>
  );
}
