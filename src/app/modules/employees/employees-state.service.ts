import {computed, Injectable, Signal, signal} from "@angular/core";
import {Employee, EmployeesState, Position} from "./employees.model";

@Injectable({providedIn: 'root'})
export class EmployeesStateService {
  private readonly _state = signal<EmployeesState>({
    employees: [{
      id: crypto.randomUUID(),
      name: 'Maciej Walecki',
      age: 24,
      isFullTime: true,
      position: Position.JUNIOR
    }]
  })

  public getStateSlice<K extends keyof EmployeesState>(key: K): Signal<EmployeesState[K]> {
    return computed(() => this._state()[key]);
  }

  public addEmployee(employee: Employee): void {
    const current = this.getStateSlice('employees');
    this.patchState({employees: [...current(), employee]});
  }

  private patchState(stateSlice: Partial<EmployeesState>): void {
    this._state.update((current) => ({...current, ...stateSlice}));
  }
}
