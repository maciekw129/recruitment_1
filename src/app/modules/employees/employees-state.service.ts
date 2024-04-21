import {computed, Injectable, Signal, signal} from "@angular/core";
import {Employee, EmployeesState, Position} from "./employees.model";

@Injectable({providedIn: 'root'})
export class EmployeesStateService {
  private readonly _state = signal<EmployeesState>({
    employees: [{
      id: '1',
      name: 'Maciej Walecki',
      age: 24,
      isFullTime: true,
      position: Position.JUNIOR
    }]
  })

  public getAllEmployees(): Signal<Employee[]> {
    return this.getStateSlice('employees');
  }

  public getEmployeeById(id: string): Employee | undefined {
    return this.getStateSlice('employees')().find(employee => employee.id === id);
  }

  public addEmployee(employee: Employee): void {
    const current = this.getStateSlice('employees');
    this.patchState({employees: [...current(), employee]});
  }

  public editEmployee(employee: Employee): void {
    const employees = this.getAllEmployees()();
    const index = employees.findIndex(({id}) => employee.id === id);
    employees[index] = employee;

    this.patchState({employees: employees});
  }

  public removeEmployee(id: string): void {
    const employees = this.getAllEmployees()();
    const filtered = employees.filter(employee => employee.id !== id);

    this.patchState({employees: filtered});
  }

  private getStateSlice<K extends keyof EmployeesState>(key: K): Signal<EmployeesState[K]> {
    return computed(() => this._state()[key]);
  }

  private patchState(stateSlice: Partial<EmployeesState>): void {
    this._state.update((current) => ({...current, ...stateSlice}));
  }
}
