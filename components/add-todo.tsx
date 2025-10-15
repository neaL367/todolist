"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import type { TodoModel } from "@/models/todo";

type AddTodoProps = {
  onAdd: (todo: TodoModel) => void;
};

export function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo: TodoModel = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };

    onAdd(newTodo);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Enter todo title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Add a short description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" className="self-end">
        <Plus /> Add Todo
      </Button>
    </form>
  );
}
