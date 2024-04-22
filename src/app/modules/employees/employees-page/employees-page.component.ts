import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ButtonComponent} from "../../../shared/components/button/button.component";
import {TableColumnCellDirective} from "../../../shared/components/table/table-column-cell.directive";
import {TableComponent} from "../../../shared/components/table/table.component";
import {EmployeesStateService} from "../employees-state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {COLUMNS} from "./employees-page.data";
import {PositionLabelPipe} from "../pipes/position-label.pipe";
import {BooleanLabelPipe} from "../../../shared/pipes/boolean-label.pipe";
import {RowActions} from "../../../shared/components/table/table.model";
import {Employee} from "../employees.model";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    ButtonComponent,
    TableColumnCellDirective,
    TableComponent,
    PositionLabelPipe,
    BooleanLabelPipe
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesPageComponent {
  private readonly employeesStateService = inject(EmployeesStateService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly columns = COLUMNS;

  public readonly actions: RowActions<Employee>[] = [
    {
      icon: 'edit',
      action: ({id}) => this.navigateToEditEmployee(id)
    },
    {
      icon: 'delete',
      action: ({id}) => {
        if(confirm("Czy na pewno chcesz usunąć pracownika?")) {
          this.employeesStateService.removeEmployee(id);
        }
      }
    }
  ]

  public readonly employees = toSignal(this.employeesStateService.getAllEmployees(), {initialValue: []});

  public navigateToCreateEmployee(): void {
    this.router.navigate(['dodaj'], {relativeTo: this.activatedRoute});
  }

  private navigateToEditEmployee(id: string): void {
    this.router.navigate(['edytuj', id], {relativeTo: this.activatedRoute});
  }
}
