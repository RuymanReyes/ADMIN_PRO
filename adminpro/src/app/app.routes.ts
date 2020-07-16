import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages/pages.component';


const APPROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progess', component: ProgressComponent },
      { path: 'grafica1', component: Graficas1Component },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot(APPROUTES, { useHash: true });
