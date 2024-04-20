import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    UpperCasePipe
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  public content = input.required<string>();
  public callback = input<() => {}>();
}
