import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-browse',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    PokemonCardComponent,
],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent implements OnInit {
  readonly #pokemonService = inject(PokemonApiService);
  readonly #themeService = inject(ThemeService);
  readonly #router = inject(Router);

  readonly pokemonList = this.#pokemonService.pokemonList;
  readonly #randomPokemonId = Math.floor(Math.random() * 151) + 1;
  readonly featuredArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.#randomPokemonId}.png`;

  ngOnInit(): void {
    this.#themeService.clearType();
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
