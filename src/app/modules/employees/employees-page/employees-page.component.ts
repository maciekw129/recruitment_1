import {Component, inject} from '@angular/core';
import {ButtonComponent} from "../../../shared/components/button/button.component";
import {TableColumnCellDirective} from "../../../shared/components/table/table-column-cell.directive";
import {TableComponent} from "../../../shared/components/table/table.component";
import {EmployeesStateService} from "../employees-state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {COLUMNS} from "./employees-page.data";

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    ButtonComponent,
    TableColumnCellDirective,
    TableComponent
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss'
})
export class EmployeesPageComponent {
  private readonly employeesStateService = inject(EmployeesStateService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly columns = COLUMNS;

  public readonly employees = this.employeesStateService.getStateSlice('employees');

  public navigateToCreateEmployee(): void {
    this.router.navigate(['dodaj'], {relativeTo: this.activatedRoute});
  }
}
