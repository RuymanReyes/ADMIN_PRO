import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: []
})
export class MedicosComponent implements OnInit {
    totalMedicos: number = 0;
    desde: number = 0;
    medicos: Medico[] = [];



  constructor(
    public _medicosServices: MedicoService
  ) {
   }

  ngOnInit() {
    this.cargarMedico();
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if ( desde >= this.totalMedicos) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarMedico();
  }


  // ========================
  // CARGAR MEDICO
  // ========================

  cargarMedico() {
    this._medicosServices.cargarMedicos( this.desde )
          .subscribe( (resp: any ) => {
              this.totalMedicos = resp.total;
              this.medicos = resp.medicos;
          } );
  }

  // ========================
  // BUSCAR MEDICO
  // ========================
  buscarMedico( termino: string ) {
    this._medicosServices.buscarMedicos( termino )
        .subscribe(medicos => this.medicos = medicos );
  }

  // ========================
  // BORRAR MEDICO
  // ========================

  borrarMedico( medico: Medico ) {
    this._medicosServices.borrarMedico( medico._id )
        .subscribe( () => this.cargarMedico() );
  }


}
