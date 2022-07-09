import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let pipeType = args[0];

    switch (pipeType) {
      case "trunc":
        
        return value?.length>25 ? value.substring(0,24).concat("...") : value;
        
    
      default:
        return value?value:"-";
    }
  }

}
