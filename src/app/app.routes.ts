import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pracownicy',
    loadChildren: () => import('./modules/employees/employees-routing.module').then((m) => m.EmployeesRoutingModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'pracownicy'
  }
];
