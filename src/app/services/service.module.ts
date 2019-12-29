import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SettingService, SidebarService, SharedService, UsuarioService } from './service.index';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingService,
    SidebarService,
    SharedService,
    UsuarioService
  ]
})
export class ServiceModule { }
