"use client";

import { useState } from "react";
import type { TodoModel } from "@/models/todo";

type FilterType = "all" | "done" | "not done";

export function useTodoFilter(todos: TodoModel[], query: string) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "done") return todo.completed;
      if (filter === "not done") return !todo.completed;
      return true;
    })
    .filter(
      (todo) =>
        todo.title.toLowerCase().includes(query) ||
        todo.description?.toLowerCase().includes(query),
    );

  return {
    filter,
    setFilter,
    filteredTodos,
  };
}
