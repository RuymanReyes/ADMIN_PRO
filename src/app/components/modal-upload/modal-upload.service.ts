import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  public notificación = new EventEmitter<any>();

  constructor() {
    console.log('Modal SERVICE LISTO');
  }


  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.id = id;
    this.tipo = tipo;


    this.oculto = '';
  }
}
