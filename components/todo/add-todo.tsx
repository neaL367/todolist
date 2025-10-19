"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import type { TodoModel } from "@/models/todo";

type AddTodoProps = {
  onAddAction: (todo: TodoModel) => void;
};

export function AddTodo({ onAddAction }: AddTodoProps) {
  const [addTodo, setAddTodo] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAddTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addTodo.title.trim()) return;

    const newTodo: TodoModel = {
      id: Date.now(),
      title: addTodo.title,
      description: addTodo.description,
      completed: false,
      createdAt: new Date(),
    };

    onAddAction(newTodo);
    setAddTodo({ title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        name="title"
        type="text"
        placeholder="enter todo title..."
        value={addTodo.title}
        onChange={handleChange}
        required
      />
      <Textarea
        name="description"
        placeholder="add a short description..."
        value={addTodo.description}
        onChange={handleChange}
      />
      <Button type="submit" className="self-start">
        <Plus /> add todo
      </Button>
    </form>
  );
}
