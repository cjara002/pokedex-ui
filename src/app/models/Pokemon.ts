import { PokemonStat } from "./PokemanStat";
import { PokemonSprites } from "./PokemonSprites";
import { PokemonType } from "./PokemonType";

export interface Pokemon {
  id: number;
  name: string;
  order: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
}