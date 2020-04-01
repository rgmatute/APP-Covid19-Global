import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: String): any[] {
    
    if(texto === ''){
      return arreglo;
    }
    
    return arreglo.filter(item=>{
        return item.country.toLowerCase()
              .includes(texto.toLowerCase());
    });
  }

}
