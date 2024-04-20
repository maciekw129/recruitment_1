import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TableComponent} from "../../shared/components/table/table.component";
import {TableColumnCellDirective} from "../../shared/components/table/table-column-cell.directive";
import {EmployeesStateService} from "../../modules/employees/employees-state.service";
import {COLUMNS} from "./home.data";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableComponent,
    TableColumnCellDirective,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly employeesStateService = inject(EmployeesStateService);

  public readonly columns = COLUMNS;

  public readonly employees = this.employeesStateService.getStateSlice('employees');
}
