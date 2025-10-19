import type { PokemonModel } from "@/models/pokemon";

export const getPokemon = async (name: string): Promise<PokemonModel | null> => {
  if (!name || name.trim() === "") {
    return null;
  }
  
  const query = name.trim().toLowerCase().replace(/\s+/g, "-");
  
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${query}`
    );
    
    if (!res.ok) {
      return null;
    }
    
    const data: PokemonModel = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch pokemon: ${name}`, error);
    return null;
  }
};