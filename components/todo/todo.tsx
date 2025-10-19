"use client";

import { useState } from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TodoModel } from "@/models/todo";

type TodoProps = {
  todo: TodoModel;
  onDeleteAction: (id: number) => void;
  onCompletedAction: (id: number) => void;
  onEditAction: (
    id: number,
    updates: { title: string; description?: string },
  ) => void;
};

export function Todo({
  todo,
  onDeleteAction,
  onCompletedAction,
  onEditAction,
}: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState({
    title: todo.title,
    description: todo.description ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    onEditAction(todo.id, editTodo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTodo({
      title: todo.title,
      description: todo.description ?? "",
    });
  };

  return (
    <Item variant="outline" className="">
      <ItemContent>
        {isEditing ? (
          <div>
            <ItemTitle>
              <Input
                name="title"
                value={editTodo.title}
                onChange={handleChange}
                placeholder="Edit title"
              />
            </ItemTitle>
            <ItemDescription>
              <Input
                name="description"
                value={editTodo.description}
                onChange={handleChange}
                placeholder="Edit description"
              />
            </ItemDescription>
          </div>
        ) : (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between">
            <div>
              <ItemTitle className="mb-2.5">
                {todo.title} {todo.completed ? "(Done)" : "(Not Done)"}
              </ItemTitle>
              {todo.description && (
                <ItemDescription>{todo.description}</ItemDescription>
              )}
            </div>
            <div>Created at {new Date(todo.createdAt).toLocaleString()}</div>
          </div>
        )}
      </ItemContent>

      <ItemActions className="w-full">
        {isEditing ? (
          <div className="w-full flex gap-2 flex-col sm:flex-row">
            <Button variant="outline" size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="w-full flex gap-2 flex-col sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCompletedAction(todo.id)}
            >
              {todo.completed ? "Mark as Undone" : "Mark as Done"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteAction(todo.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </ItemActions>
    </Item>
  );
}
