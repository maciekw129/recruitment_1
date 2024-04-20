import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormMode} from "./employees-form/employees-form.model";

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
    }
  ])]
})
export class EmployeesRoutingModule {}
