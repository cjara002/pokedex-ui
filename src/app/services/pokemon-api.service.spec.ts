import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PokemonApiService } from './pokemon-api.service';
import { environment } from '../../environments/environment';

describe('PokemonApiService', () => {
  let service: PokemonApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('fetches a pokemon by name when one is selected', async () => {
    service.selectPokemon('pikachu');
    TestBed.flushEffects();

    const req = httpMock.expectOne(`${environment.apiURL}/pikachu`);
    expect(req.request.method).toBe('GET');
    req.flush({ id: 25, name: 'pikachu' });

    // The list resource also loads on startup; answer it so verify() passes.
    httpMock
      .expectOne(`${environment.apiURL}?limit=20&offset=0`)
      .flush({ count: 0, next: null, previous: null, results: [] });

    // Resources update their value asynchronously
    await TestBed.inject(ApplicationRef).whenStable();
    expect(service.pokemonDetail.value()?.name).toBe('pikachu');
  });
});
