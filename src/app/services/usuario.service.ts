import { Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient
  ) {
    console.log('servicio de usuario listo');
  }


  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }


  loginGoogle(token: string) {
    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }


  login(usuario: Usuario, recuerdame: boolean = false) {


    if (recuerdame === true) {
      localStorage.setItem('email', usuario.email)
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

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICES + '/usuario';

    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
      );
  }




}
