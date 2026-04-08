import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { TitleCasePipe } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-detail',
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    TitleCasePipe,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
  readonly #themeService = inject(ThemeService);
  readonly name = input.required<string>();

  readonly #pokemonService = inject(PokemonApiService);
  readonly #router = inject(Router);

  readonly pokemon = this.#pokemonService.pokemonDetail;

  readonly primaryType = computed(() => {
    const pokemonDetail = this.pokemon.value();

    if (!pokemonDetail || !pokemonDetail.types?.length) return 'normal';
    const type = pokemonDetail.types[0].type.name;
    this.#themeService.setType(type);
    return type;
  });

  readonly spriteUrl = computed(() => {
    const pokemonDetail = this.pokemon.value();
    if (!pokemonDetail) return '';
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetail.id}.png`;
  });

  ngOnInit(): void {
    this.#pokemonService.selectPokemon(this.name());
  }

  onBack(): void {
    this.#router.navigate(['/browse']);
  }
}
