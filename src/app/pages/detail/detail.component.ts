import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
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
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCard, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-detail',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    TitleCasePipe,
    MatCard
],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly #themeService = inject(ThemeService);
  readonly name = input.required<string>();

  readonly #pokemonService = inject(PokemonApiService);
  readonly #router = inject(Router);

  readonly pokemon = this.#pokemonService.pokemonDetail;

  readonly primaryType = computed(() => {
    const pokemonDetail = this.pokemon.value();
    if (!pokemonDetail || !pokemonDetail.types?.length) return 'normal';
    return pokemonDetail.types[0].type.name;
  });

  readonly spriteUrl = computed(() => {
    const pokemonDetail = this.pokemon.value();
    if (!pokemonDetail) return '';
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetail.id}.png`;
  });

  constructor() {
  toObservable(this.primaryType)
    .pipe(takeUntilDestroyed(this.#destroyRef))
    .subscribe(type => this.#themeService.setType(type));
}

  ngOnInit(): void {
    this.#pokemonService.selectPokemon(this.name());
  }

  onBack(): void {
    this.#router.navigate(['/browse']);
  }
}
