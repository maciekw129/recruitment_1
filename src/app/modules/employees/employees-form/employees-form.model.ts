import {Position} from "../employees.model";
import {FormControl} from "@angular/forms";
import {SelectOption} from "../../../shared/controls/field-select/field-select.model";

export interface EmployeesFormControls {
  id: FormControl<string>;
  name: FormControl<string>;
  age: FormControl<number | null>;
  isFullTime: FormControl<boolean>;
  position: FormControl<Position | null>;
}

export interface EmployeesFormResolveData {
  mode: FormMode
}

export interface EmployeesFormOptions {
  position: SelectOption<Position>[];
}

export enum FormMode {
  CREATE = 'CREATE',
  EDIT = 'EDIT'
}
