import { Usuario } from '../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
  ) {
    this.cargarStorage();
  }

  // ====================================
  // LOGOUT USUARIO
  // ====================================

  logOut() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

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
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  // ====================================
  // GUARDAR EN EL LOCALSTORAGE
  // ====================================
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  // ====================================
  // LOGIN CON GOOGLE
  // ====================================
  loginGoogle(token: string) {
    const url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
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
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);

        return true;
      }));
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
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        }


        Swal.fire('Usuario Actualizado', usuario.nombre, 'success');

        return true;
      }));

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

        this.guardarStorage(id, this.token, this.usuario);
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
