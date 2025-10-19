import Image from "next/image";
import { getPokemon } from "@/services/pokemon";
import type { PokemonModel } from "@/models/pokemon";

export async function Pokemon({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="text-gray-500 text-center mt-10">
        <p>Start by searching for a Pokémon name.</p>
      </div>
    );
  }

  let pokemon: PokemonModel | null = null;
  try {
    pokemon = await getPokemon(query);
  } catch {
    pokemon = null;
  }

  if (!pokemon) {
    return (
      <div className="text-center text-red-500 mt-6 border border-red-300 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl shadow">
        <p className="font-medium">
          Pokémon &quot;<span className="font-semibold">{query}</span>&quot; not found.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Try checking the spelling or use a different name.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 border rounded-2xl shadow-md bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm w-full max-w-sm">
      <div className="flex flex-col items-center text-center gap-2">
        <h2 className="text-3xl font-extrabold capitalize tracking-wide">
          {pokemon.name}
        </h2>
        <p className="text-gray-500 text-sm">#{pokemon.id}</p>
        {pokemon.sprites.front_default && (
          <div className="relative w-32 h-32 mt-2">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              sizes="128px"
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="grid grid-cols-2 gap-2 text-center text-sm sm:text-base">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Height</p>
            <p className="text-gray-900 dark:text-gray-100">{pokemon.height}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Weight</p>
            <p className="text-gray-900 dark:text-gray-100">{pokemon.weight}</p>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold mb-1">Types</h3>
          <div className="flex justify-center flex-wrap gap-2">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white capitalize shadow"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
