import {ChangeDetectionStrategy, Component, computed, EventEmitter, input, Output, output} from '@angular/core';
import {NgClass, UpperCasePipe} from "@angular/common";
import {ButtonTypes} from "./button.model";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    UpperCasePipe,
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  public content = input<string>('');
  public type = input<ButtonTypes>('button');
  public icon = input<string>('');

  public isIconButton = computed(() => Boolean(this.icon()));

  @Output() buttonClicked = new EventEmitter<void>();
}
