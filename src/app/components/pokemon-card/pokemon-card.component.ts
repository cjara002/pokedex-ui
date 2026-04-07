import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { PokemonListItem } from '../../models/PokemonListItem';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  imports: [MatCard, MatCardContent, TitleCasePipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  readonly pokemon = input.required<PokemonListItem>();
  readonly pokemonSelected = output<string>();
  readonly spriteUrl = computed(() => {
    const url = this.pokemon().url;
    const id = url
      .split('/')
      .filter((s) => s.length > 0)
      .at(-1);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  });

  onCardClick(): void {
    this.pokemonSelected.emit(this.pokemon().name);
  }
}
