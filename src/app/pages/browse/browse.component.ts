import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-browse',
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TitleCasePipe
  ],
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

  onNextPage(): void {
    const current = this.#pokemonService.searchParams();
    this.#pokemonService.loadPokemonList(
      current.limit,
      current.offset + current.limit
    );
  }

  onPreviousPage(): void {
    const current = this.#pokemonService.searchParams();
    this.#pokemonService.loadPokemonList(
      current.limit,
      Math.max(0, current.offset - current.limit)
    )
  }
}
