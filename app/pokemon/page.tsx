import { Suspense } from "react";
import { Search } from "@/components/shared/search";
import { Pokemon } from "@/components/pokemon/pokemon";
import { NavigationButton } from "@/components/shared/navigation-button";

export default async function PokemonPage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl font-bold">pokémon search</h1>
      <Search placeholder="Enter Pokémon name (e.g. pikachu)" />
      <Suspense fallback={<div>loading...</div>}>
        <Pokemon query={query} />
      </Suspense>
      <NavigationButton href="/">back to home page</NavigationButton>
    </div>
  );
}
