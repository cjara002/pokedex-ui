import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  imports: [],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent implements OnInit {
  readonly #pokemonService = inject(PokemonApiService);
  readonly #router = inject(Router);

  readonly pokemonList = this.#pokemonService.pokemonList;

  ngOnInit(): void {
    this.#pokemonService.loadPokemonList(20, 0);
  }

  onPokemonSelected(name: string): void {
    this.#router.navigate(['/pokemon', name]);
  }
}
