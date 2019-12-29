import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';


declare function init_plugins(); // esta funcion es del template para que no se quede en el spinner trabado.

// declaramos aquí como arriba una librería y le decimos que existe a TS, es de google.
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  // esto es un método de google que declaramos para general el token de google.
  auth2: any;

  constructor(
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }


  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '577154885549-n18k30l3fj2jcd9r7niql7c4a9horu4q.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attacSignin(document.getElementById('btnGoogle'));

    });
  }

  attacSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();

      const token = googleUser.getAuthResponse().id_token;
      console.log(token);

      this._usuarioService.loginGoogle(token)
        .subscribe(loginCorrecto => this.router.navigate(['/dashboard']));
      // en el caso de que cuando entremos nos de errores de recarga, debemos hacer lo siguiente
      // .subcribe( () => windows.location.href = '#/dashboard' );
      // Otra manera sin que tener que usar JS es la usando NgZone de angular, que debemos importar
      // e inyectar dentro del constructor como siempre
      // this._usuarioService.loginGoogle(token)
      //   .subscribe(() => this._ngZone.run(() => this.router.navigate(['/dashboard'])));

      console.log(profile);
    });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    // tslint:disable-next-line: prefer-const
    let usuario = new Usuario(null, null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(loginCorrecto => this.router.navigate(['/dashboard']));


    // this.router.navigate(['/dashboard']);
  }

}
