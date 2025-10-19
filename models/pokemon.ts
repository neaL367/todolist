export type PokemonModel = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: PokemonSprites;
};

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type PokemonSprites = {
  front_default: string | null;
};
