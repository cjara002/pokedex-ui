import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import {
  MatFormField,
  MatInput,
  MatInputModule,
} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly #themeService = inject(ThemeService);
  readonly #router = inject(Router);
  searchQuery = signal('');

  readonly navBackground = computed(() => {
    const color = this.#themeService.activeColor();
    return color ?? 'transparent';
  });

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  onSearch(): void {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return;
    this.#router.navigate(['/pokemon', query]);
    this.searchQuery.set('');
  }

  onLogoClick(): void {
    this.#router.navigate(['/browse']);
  }
}
