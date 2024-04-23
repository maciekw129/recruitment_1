import {Injectable} from "@angular/core";
import {Employee, EmployeesState, Position} from "./employees.model";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class EmployeesStateService {
  private readonly _state = new BehaviorSubject<EmployeesState>({
    employees: [{
      id: crypto.randomUUID(),
      name: 'Maciej Walecki',
      age: 24,
      isFullTime: true,
      position: Position.JUNIOR
    }]
  })

  public getAllEmployees(): Observable<Employee[]> {
    return this.getStateSlice('employees');
  }

  public getEmployeeById(id: string): Observable<Employee | null> {
    return this.getStateSlice('employees').pipe(map(employees => employees.find(employee => employee.id === id) ?? null))
  }

  public addEmployee(employee: Employee): void {
    const current = this._state.value.employees;
    this.patchState({employees: [...current, employee]});
  }

  public editEmployee(employee: Employee): void {
    const employees = this._state.value.employees;
    const index = employees.findIndex(({id}) => employee.id === id);
    employees[index] = employee;

    this.patchState({employees: employees});
  }

  public removeEmployee(id: string): void {
    const employees = this._state.value.employees;
    const filtered = employees.filter(employee => employee.id !== id);

    this.patchState({employees: filtered});
  }

  private getStateSlice<K extends keyof EmployeesState>(key: K): Observable<EmployeesState[K]> {
    return this._state.pipe(map(state => state[key]));
  }

  private patchState(stateSlice: Partial<EmployeesState>): void {
    this._state.next({...this._state.value, ...stateSlice})
  }
}
