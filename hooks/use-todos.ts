"use client"

import { useState, useEffect } from "react";
import type { TodoModel } from "@/models/todo";
import { getTodos, saveTodos } from "@/services/local-storage";

export function useTodos() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedTodos = getTodos();
    setTodos(loadedTodos);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTodos(todos);
    }
  }, [todos, isLoaded]);

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
  };
}