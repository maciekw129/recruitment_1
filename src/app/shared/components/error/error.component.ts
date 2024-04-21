import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { VALIDATION_ERRORS } from "./error.tokens";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
  public error = input<string>('');

  private readonly validationErrors = inject(VALIDATION_ERRORS);

  public errorText = computed(() => this.validationErrors[this.error()] ?? this.validationErrors['default'])
}
