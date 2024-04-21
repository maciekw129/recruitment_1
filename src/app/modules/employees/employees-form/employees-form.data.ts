import {EmployeesFormOptions, FormMode} from "./employees-form.model";
import {Position} from "../employees.model";
import {POSITION_LABELS} from "../employees.data";

export const TITLE = {
  [FormMode.CREATE]: 'Dodaj pracownika',
  [FormMode.EDIT]: 'Edytuj dane pracownika'
} satisfies Record<FormMode, string>;

export const OPTIONS: EmployeesFormOptions = {
  position: [
    {value: Position.JUNIOR, label: POSITION_LABELS.JUNIOR},
    {value: Position.MID, label: POSITION_LABELS.MID},
    {value: Position.SENIOR, label: POSITION_LABELS.SENIOR},
    {value: Position.MANAGER, label: POSITION_LABELS.MANAGER}
  ]
}
