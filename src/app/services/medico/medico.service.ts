import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';
import { Medico } from 'src/app/models/medico.model';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  token = localStorage.getItem('token');

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  // ========================
  // CARGAR LOS MEDICOS
  // ========================

  cargarMedicos( desde: number = 0 ) {
    const url = URL_SERVICES + '/medico?desde=' + desde;

    return this.http.get( url )
      .pipe(map((resp: any) => {
        console.log(resp)
        return resp;
      }));
  }

  // ====================================
  // BUSCAR UN MEDICO
  // ====================================

  buscarMedicos(termino: string) {
    const url = URL_SERVICES + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.medicos));
  }

  // ========================
  //  BORRAR MEDICO
  // ========================

  borrarMedico( id: string ) {
    let url = URL_SERVICES + '/medico/' + id;
    url += '?token=' +  this._usuarioService.token;

    return this.http.delete( url )
          .pipe(map( (resp: any ) => {
            Swal.fire(
              '¡BORRADO',
              'El Médico, ha sido eliminado',
              'success'
            );

            return resp;
          }));
  }

  // ========================
  //  CREAR MEDICO
  // ========================

  guardarMedico( medico: Medico ) {
    let url = URL_SERVICES + '/medico';

    if ( medico._id ) {

      // ACTUALIZA EL MEDICO
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put ( url, medico )
          .pipe(map((resp: any)  => {
            Swal.fire('Médico Actualizado', medico.nombre, 'success');
            return resp.medico;
          }));

    } else {
      // CREANDO
      url += '?token=' + this.token;

      return this.http.post( url , medico )
        .pipe(map((resp: any)  => {
          Swal.fire( 'Médico Creado', medico.nombre, 'success');
          return resp.medico;
        }));
    }

  }

  // ========================
  //  CARGAR MEDICO
  // ========================

  cargarMedico( id: string ) {
    let url = URL_SERVICES + '/medico/' + id;

    return this.http.get( url )
        .pipe(map( ( resp: any ) => resp.medico ));
  }
}
