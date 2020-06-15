import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuard,
  AdminGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService

} from './service.index';



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
    SubirArchivoService,
    LoginGuard,
    AdminGuard,
    ModalUploadService,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule { }
