import {computed, Injectable, Signal, signal} from "@angular/core";
import {EmployeesState, Position} from "./employees.model";

@Injectable({providedIn: 'root'})
export class EmployeesStateService {
  private readonly _state = signal<EmployeesState>({
    employees: [{
      name: 'Maciej Walecki',
      age: 24,
      isFullTime: true,
      position: Position.JUNIOR
    }]
  })

  public patchState(stateSlice: Partial<EmployeesState>): void {
    this._state.update((current) => ({...current, stateSlice}))
  }

  public getStateSlice<K extends keyof EmployeesState>(key: K): Signal<EmployeesState[K]> {
    return computed(() => this._state()[key]);
  }
}
