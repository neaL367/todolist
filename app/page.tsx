"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

import { ThemeButton } from "@/components/shared/theme-button";
import { NavigationButton } from "@/components/shared/navigation-button";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ListTodo } from "@/components/todo/list-todo";
import { AddTodo } from "@/components/todo/add-todo";
import { Search } from "@/components/shared/search";

import PokemonSVG from "@/components/pokemon/pokemon.svg";

import { useTodos } from "@/hooks/use-todos";
import { useTodoFilter } from "@/hooks/use-todo-filter";

const filterOptions = ["all", "done", "not done"] as const;

function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() ?? "";

  const {
    todos,
    handleAdd,
    handleDelete,
    handleCompleted,
    handleEdit,
    handleAllCompleted,
  } = useTodos();
  const { filter, setFilter, filteredTodos } = useTodoFilter(todos, query);

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

        <section className="w-full flex flex-col sm:flex-row gap-2 flex-wrap">
          <Search placeholder="search todos..." />
          {filterOptions.map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              className={`${
                filter === f ? "font-bold underline dark:underline" : ""
              }`}
            >
              {f}
            </Button>
          ))}
          <Button onClick={handleAllCompleted}>Mark All Done/Not Done</Button>
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
