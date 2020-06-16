import { Usuario } from '../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { pipe, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
  ) {
    this.cargarStorage();
  }

  // ========================
  //  RENOVAR TOKEN
  // ========================

  renuevaToken() {
     let url = URL_SERVICES + '/login/renuevaToken';

     url += '?token=' + this.token;

     return this.http.get(url)
        .pipe(map( (resp: any ) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token );

          return true;
        }))
        .pipe(
          catchError( err => {
            this.router.navigate(['/login']);
            Swal.fire('No se pudo renovar el Token', 'No fue posible renovar el Token', 'error');
            return throwError( err );
          })
        );

  }


  // ====================================
  // LOGOUT USUARIO
  // ====================================

  logOut() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  // ====================================
  // ESTA LOGUEADO
  // ====================================
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  // ====================================
  // CARGAR EL STORAGE
  // ====================================
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  // ====================================
  // GUARDAR EN EL LOCALSTORAGE
  // ====================================
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  // ====================================
  // LOGIN CON GOOGLE
  // ====================================
  loginGoogle(token: string) {
    const url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu );
        console.log(resp);
        return true;
      }));
  }

  // ====================================
  // LOGIN NORMAL
  // ====================================
  login(usuario: Usuario, recuerdame: boolean = false) {


    if (recuerdame === true) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }


    const url = URL_SERVICES + '/login';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        console.log(resp);

        return true;
      }))
      .pipe(
        catchError( err => {
          Swal.fire('Error en el Login', err.error.mensaje, 'error');
          return throwError( err );
        })
      );
  }

  // ====================================
  // CREAR USUARIO
  // ====================================

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICES + '/usuario';

    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
      )
      .pipe(
        catchError( err => {
          Swal.fire( err.error.mensaje, err.error.errors.message, 'error');
          return throwError( err );
        })
      );
  }

  // ====================================
  // ACTUALIZAR USUARIO
  // ====================================
  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .pipe(map((resp: any) => {

        if (usuario._id === this.usuario._id) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu );
        }


        Swal.fire('Usuario Actualizado', usuario.nombre, 'success');

        return true;
      }))
      .pipe(
        catchError( err => {
          Swal.fire( err.error.mensaje, err.error.errors.message, 'error');
          return throwError( err );
        })
      );

  }

  // ====================================
  // ELIMINAR USUARIO
  // ====================================

  borrarUsuario(id: string) {
    let url = URL_SERVICES + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
      .pipe(map((resp: any) => {
        Swal.fire(
          '¡Borrado!',
          'El usuario,' + this.usuario.nombre + 'ha sido borrado',
          'success'
        );
        return true;
      }));
  }

  // ====================================
  // CAMBIAR IMAGEN DE USUARIO
  // ====================================

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire('Imagen Actualizada', this.usuario.nombre, 'success');

        this.guardarStorage(id, this.token, this.usuario, this.menu );
      })

      .catch(resp => {
        console.log(resp);
      });
  }


  // ====================================
  // CARGAR USUARIOS
  // ====================================

  cargarUsuarios(desde: number = 0) {

    const url = URL_SERVICES + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  // ====================================
  // BUSCAR UN USUARIO
  // ====================================

  buscarUsuarios(termino: string) {
    const url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.usuarios));
  }

}
