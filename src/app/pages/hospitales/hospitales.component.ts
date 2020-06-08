import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { swalProviderToken } from '@sweetalert2/ngx-sweetalert2/lib/di';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  cargando: boolean = true;

  totalRegistros: number = 0;

  constructor(
    public _hospitalesServices: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificación.subscribe( resp => this.cargarHospitales() );

  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalesServices.cargarHospitales(this.desde)
         .subscribe( (resp: any) => {
            console.log(resp);
            this.totalRegistros = resp.total;
            this.hospitales = resp;
            this.cargando = false;
         });
  }

  obtenerHospitalById( id ) {
    this.cargando = true;

    this._hospitalesServices.getHospitalByID( id )
        .subscribe((resp: any) => {
          console.log(resp);
          this.cargando = false;
        });
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;

    this._hospitalesServices.buscarHospital(termino)
        .subscribe( (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
          this.cargando = false;
        });
  }

  crearHospital() {
    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hospital',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.length === 0 ) {
          return 'Tiene que escribir un nombre';
        }
        this._hospitalesServices.crearHospital(value)
        .subscribe( () => this.cargarHospitales() );
      }
    });
  }

  borrarHospital(hospital: Hospital) {

    Swal.fire({
      title: '¿Estas seguro',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Bórralo!'
    }).then((result) => {
      if (result) {
        this._hospitalesServices.borrarHospital(hospital._id)
          .subscribe((borrado: boolean) => {
            console.log(borrado);
            if (this.desde === this.totalRegistros) {
              this.desde -= 5;
            }
            this.cargarHospitales();
          });
      }
    });
  }

  guardarHospital( hospital: Hospital) {
    this._hospitalesServices.actualizarHospital(hospital)
        .subscribe();
  }

  actualizarImagen( hospital: Hospital ) {
  
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id);
  }

}
