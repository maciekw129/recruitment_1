import {TableColumn} from "../../shared/components/table/table.model";
import {Employee} from "../../modules/employees/employees.model";

export const COLUMNS: TableColumn<Employee>[] = [
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
