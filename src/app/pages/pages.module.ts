import { NgModule } from '@angular/core';

import { SharedMoule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

// NG2 CHARTS GRAFICAS
import { ChartsModule } from 'ng2-charts';

// RUTAS
import { PAGES_ROUTES } from './pages.routes';


import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';


// TEMPORAL
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficosDonaComponent } from '../components/graficos-dona/graficos-dona.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    IncrementadorComponent,
    GraficosDonaComponent,
    AccountSettingComponent,
    PromisesComponent,
    RxjsComponent
  ],
  exports: [
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    PromisesComponent,
  ],

  imports: [
    SharedMoule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ]
})

export class PagesModule { }
