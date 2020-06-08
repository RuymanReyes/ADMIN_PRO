import { Hospital } from '../../models/hospital.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Usuario } from '../../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  usuario: Usuario;
  token = localStorage.getItem('token');


  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { }

  // ====================================
  // CARGAR LOS HOSPITALES
  // ====================================

  cargarHospitales(desde: number = 0) {

    const url = URL_SERVICES + '/hospital?desde=' + desde;

    return this.http.get(url)
      .pipe(map( (resp: any) => {
        return resp.hospitales;
      }));
  }

  // ====================================
  // OBTENER HOSPITAL POR ID
  // ====================================

  getHospitalByID(id) {
    const url = URL_SERVICES + '/hospital/' + id;
    return this.http.get(url)
        .pipe(map ( (resp: any) => resp.hospital ));
  }

  // ====================================
  // BUSCAR UN HOSPITAL
  // ====================================

  buscarHospital(termino: string) {
    const url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospitales));
  }

  // ====================================
  // CREAR UN HOSPITAL
  // ====================================

  crearHospital(nombre: string) {
    let url = URL_SERVICES + '/hospital';
    url += '?token=' + this.token;

    return this.http.post(url, { nombre })
      .pipe(map((resp: any) => {
        Swal.fire('Hospital Creado', nombre, 'success');
        return resp.hospital;
      }));
  }

  // ====================================
  // ACTUALIZAR HOSPITAL
  // ====================================

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this.http.put(url, hospital)
      .pipe(map((resp: any) => {
        Swal.fire('Hospital Actualizado', hospital.nombre, 'success');

        return resp.hospital;

      }
      ));
  }

  // ====================================
  // ELIMINAR UN HOSPITAL
  // ====================================

  borrarHospital(id: string) {
    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(map((resp: any) => {
        Swal.fire(
          '¡BORRADO',
          'El hospital, ha sido eliminado',
          'success'
        );
        return true;

      }));
  }

  // ====================================
  // CAMBIAR LA IMAGEN DEL HOSPITAL
  // ====================================

  cambiarImagenHospital(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'hospitales', id)
      .then((resp: any) => {
        this.hospital.img = resp.hospital.img;
        Swal.fire('Imagen Actualizada', this.hospital.nombre, 'success');

        this.guardarStorage(id, this.token, this.hospital);
      })

      .catch(resp => {
        console.log(resp);
      });
  }


  // ====================================
  // CARGAR EL STORAGE
  // ====================================
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.hospital = JSON.parse(localStorage.getItem('hospital'));
    } else {
      this.token = '';
      this.hospital = null;
      this.usuario = null;
    }
  }

  // ====================================
  // GUARDAR EN EL LOCALSTORAGE
  // ====================================
  guardarStorage(id: string, token: string, hospital: Hospital) {
    localStorage.setItem('id', id);
    localStorage.setItem('hospital', JSON.stringify(hospital));

    this.hospital = hospital;
    this.token = token;
  }
}
