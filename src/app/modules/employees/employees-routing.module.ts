import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormMode} from "./employees-form/employees-form.model";
import {employeeResolver} from "./employee.resolver";

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      loadComponent: () => import('./employees-page/employees-page.component').then((c) => c.EmployeesPageComponent)
    },
    {
      path: 'dodaj',
      loadComponent: () => import('./employees-form/employees-form.component').then((c) => c.EmployeesFormComponent),
      data: {
        mode: FormMode.CREATE
      }
    },
    {
      path: 'edytuj/:id',
      loadComponent: () => import('./employees-form/employees-form.component').then((c) => c.EmployeesFormComponent),
      data: {
        mode: FormMode.EDIT
      },
      resolve: {
        employee: employeeResolver
      },
    }
  ])]
})
export class EmployeesRoutingModule {}
