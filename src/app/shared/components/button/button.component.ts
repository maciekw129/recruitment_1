import {ChangeDetectionStrategy, Component, EventEmitter, input, Output, output} from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {ButtonTypes} from "./button.model";

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
  public type = input<ButtonTypes>('button');

  @Output() buttonClicked = new EventEmitter<void>();
}
