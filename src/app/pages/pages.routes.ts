import { Routes, RouterModule } from '@angular/router';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const PAGESROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: 'grafica1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
      { path: 'promesas', component: PromisesComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS' } },
      { path: 'account-setting', component: AccountSettingComponent, data: { titulo: 'Ajustes del Tema' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

    ]
  }
];


export const PAGES_ROUTES = RouterModule.forChild(PAGESROUTES);
