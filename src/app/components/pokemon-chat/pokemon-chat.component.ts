import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-chat',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinner,
  ],
  templateUrl: './pokemon-chat.component.html',
  styleUrl: './pokemon-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonChatComponent {
  readonly #pokemonService = inject(PokemonApiService);

  readonly question = signal('');

  readonly agentResource = this.#pokemonService.agentResource;

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.question.set(value);
  }

  onSubmit(): void {
    const query = this.question().trim();
    if (!query || this.agentResource.isLoading()) return;
    this.#pokemonService.askAgent(query);
    this.question.set('');
  }
}
