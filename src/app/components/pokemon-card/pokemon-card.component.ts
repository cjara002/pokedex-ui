import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { PokemonListItem } from '../../models/PokemonListItem';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  imports: [MatCard, MatCardContent, TitleCasePipe, RouterLink],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PokemonCardComponent {
  readonly pokemon = input.required<PokemonListItem>();
  readonly spriteUrl = computed(() => {
    const url = this.pokemon().url;
    const id = url
      .split('/')
      .filter((s) => s.length > 0)
      .at(-1);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  });
}
