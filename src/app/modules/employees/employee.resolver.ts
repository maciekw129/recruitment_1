import { ResolveFn, Router } from '@angular/router';
import { Employee } from "./employees.model";
import { inject } from "@angular/core";
import { EmployeesStateService } from "./employees-state.service";

export const employeeResolver: ResolveFn<Employee | null> = (route, state) => {
  const employeesStateService = inject(EmployeesStateService);
  const router = inject(Router);

  const id = route.params['id'];
  const employee = employeesStateService.getEmployeeById(id);

  if(employee) {
    return employee
  }

  router.navigate(['/']);

  return null;
};
