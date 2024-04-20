import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TableComponent} from "../../shared/components/table/table.component";
import {TableColumn} from "../../shared/components/table/table.model";
import {Employee} from "../../modules/employees/employees.model";
import {TableColumnCellDirective} from "../../shared/components/table/table-column-cell.directive";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableComponent,
    TableColumnCellDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public readonly columns: TableColumn<Employee>[] = [
    {
      label: 'Imię',
      property: 'name'
    },
    {
      label: 'Wiek',
      property: 'age'
    },
    {
      label: 'Zatrudniony na pełny etat',
      property: 'isFullTime'
    },
    {
      label: 'Stanowisko',
      property: 'position'
    }
  ]

  public readonly dataSource = [];
}
