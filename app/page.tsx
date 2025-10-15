"use client";

import { useEffect, useState } from "react";
import { AddTodo } from "@/components/add-todo";
import { ListTodo } from "@/components/list-todo";
import { ThemeButton } from "@/components/theme-button";
import { Separator } from "@/components/ui/separator";

import { getTodos, saveTodos } from "@/lib/localstorage";

import type { TodoModel } from "@/models/todo";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filter, setFilter] = useState<"All" | "Done" | "Not Done">("All");

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAdd = (todo: TodoModel) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Done") return todo.completed;
    if (filter === "Not Done") return !todo.completed;
    return true;
  });

  return (
    <div className="font-sans min-h-screen p-6 sm:p-12">
      <main className="max-w-2xl mx-auto flex flex-col gap-8">
        <section className="flex justify-between">
          <h1 className=" text-3xl font-bold">Todo List</h1>
          <ThemeButton />
        </section>

        <section className="w-full">
          <AddTodo onAdd={handleAdd} />
        </section>

        <Separator />

        <section className="flex gap-2">
          {(["All", "Done", "Not Done"] as const).map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                ${filter === f ? "font-bold underline dark:underline" : ""}`}
            >
              {f}
            </Button>
          ))}
        </section>

        <section className="w-full">
          <ListTodo
            todos={filteredTodos}
            onDelete={handleDelete}
            onCompleted={handleCompleted}
          />
        </section>
      </main>
    </div>
  );
}
