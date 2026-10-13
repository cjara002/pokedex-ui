import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-not-found',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent implements OnInit {
  readonly #themeService = inject(ThemeService);

  ngOnInit(): void {
    this.#themeService.clearType();
  }
}
