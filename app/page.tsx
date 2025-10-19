"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";

import { ThemeButton } from "@/components/shared/theme-button";
import { NavigationButton } from "@/components/shared/navigation-button";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ListTodo } from "@/components/todo/list-todo";
import { AddTodo } from "@/components/todo/add-todo";
import { Search } from "@/components/shared/search";

import type { TodoModel } from "@/models/todo";
import { getTodos, saveTodos } from "@/services/local-storage";
import PokemonSVG from "/public/pokemon.svg";

const filterOptions = ["all", "done", "not done"] as const;

function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() ?? "";

  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filter, setFilter] = useState<"all" | "done" | "not done">("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const todos = getTodos();
    setTodos(todos);
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

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "all") return true;
      if (filter === "done") return todo.completed;
      if (filter === "not done") return !todo.completed;
      return true;
    })
    .filter(
      (todo) =>
        todo.title.toLowerCase().includes(query) ||
        todo.description?.toLowerCase().includes(query),
    );

  return (
    <div className="font-sans min-h-screen p-6 sm:p-12">
      <main className="max-w-2xl mx-auto flex flex-col gap-8">
        <section className="flex justify-between">
          <h1 className=" text-3xl font-bold">todo-list</h1>
          <div className="gap-2 flex">
            <ThemeButton />
            <NavigationButton href="/pokemon" size="icon">
              <Image className="h-4 w-4" src={PokemonSVG} alt="pokemon icon" />
            </NavigationButton>
          </div>
        </section>

        <section className="w-full">
          <AddTodo onAddAction={handleAdd} />
        </section>

        <Separator />

        <section className="w-full flex gap-2 flex-col sm:flex-row ">
          <Search placeholder="search todos..." />
          {filterOptions.map((f) => (
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
            onEdit={handleEdit}
          />
        </section>
      </main>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
