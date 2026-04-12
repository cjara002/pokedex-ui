import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatedResponse } from '../models/response/PaginatedResponse';
import { PokemonListItem } from '../models/PokemonListItem';
import { Pokemon } from '../models/Pokemon';
import { of } from 'rxjs';

// Registers this as a singleton across the entire app
@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  readonly #http = inject(HttpClient);
  // readonly #apiURLDEV = 'http://localhost:8080/api/pokemon';
  // readonly #agentURLDEV = 'http://localhost:8080/api/agent';
  readonly #apiURLPROD = 'https://pokedex-api-production-fb1a.up.railway.app/api/pokemon'
  readonly #agenURLPROD = 'https://pokedex-api-production-fb1a.up.railway.app/api/agent'

  readonly searchParams = signal({ limit: 20, offset: 0 });
  readonly selectedPokemonName = signal<string | null>(null);
  readonly currentQuestion = signal<string | null>(null);

  readonly pokemonList = rxResource({
    request: () => this.searchParams(),
    loader: ({ request }) =>
      this.#http.get<PaginatedResponse<PokemonListItem>>(
        `${this.#apiURLPROD}?limit=${request.limit}&offset=${request.offset}`,
      ),
  });

  readonly pokemonDetail = rxResource({
    request: () => this.selectedPokemonName(),
    loader: ({ request }) =>
      this.#http.get<Pokemon>(`${this.#apiURLPROD}/${request}`),
  });

  loadPokemonList(limit: number = 20, offset: number = 0): void {
    this.searchParams.set({ limit, offset });
  }

  selectPokemon(name: string): void {
    this.selectedPokemonName.set(name);
  }

  readonly agentResource = rxResource({
    request: () => this.currentQuestion(),
    loader: ({ request }) =>
      request
    ? this.#http.post<{ answer: string }>(`${this.#agenURLPROD}/ask`, {question: request })
    : of(null)
  })

  askAgent(question: string): void {
    this.currentQuestion.set(question);
  }
}
