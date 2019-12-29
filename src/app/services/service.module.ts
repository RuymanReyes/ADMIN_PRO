import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SettingService, SidebarService, SharedService, UsuarioService, LoginGuard } from './service.index';
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
    UsuarioService,
    LoginGuard
  ]
})
export class ServiceModule { }
