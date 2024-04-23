import {TableColumn} from "../../../shared/components/table/table.model";
import {Employee} from "../employees.model";

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
    label: 'Pełny etat',
    property: 'isFullTime'
  },
  {
    label: 'Stanowisko',
    property: 'position'
  }
];
