import { NgModule } from "@angular/core";

import { SharedMoule } from '../shared/shared.module';


// RUTAS
import { PAGES_ROUTES } from './pages.routes';


import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
  ],
  exports: [
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
  ],

  imports: [
    SharedMoule,
    PAGES_ROUTES
  ]
})

export class PagesModule { }
