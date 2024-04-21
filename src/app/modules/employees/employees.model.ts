export interface Employee {
  id: string;
  name: string;
  age: number;
  isFullTime: boolean;
  position: Position;
}

export enum Position {
  JUNIOR = 'JUNIOR',
  MID = 'MID',
  SENIOR = 'SENIOR',
  MANAGER = 'MANAGER'
}

export interface EmployeesState {
  employees: Employee[];
}
