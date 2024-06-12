import { Pokemon } from './pokemon.model';

export interface PokemonListResponse {
  count: number;
  results: Pokemon[];
}
