import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-employees-form',
  standalone: true,
  imports: [],
  templateUrl: './employees-form.component.html',
  styleUrl: './employees-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesFormComponent {

}
