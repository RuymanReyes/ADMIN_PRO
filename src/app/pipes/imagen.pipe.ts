import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICES + '/imagenes/';

    if (!img) {
      return url + '/usuarios/XXXX';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':

        url += 'usuarios/' + img;

        break;

      case 'hospital':
        url += 'hospitales/' + img;

        break;
      case 'medico':
        url += 'medicos/' + img;

        break;

      default:
        console.log('Tipo de imagen no existe, usuarios, medicos y  hospitales');
        url += 'usuarios/XXX';
    }


    return url;
  }

}
