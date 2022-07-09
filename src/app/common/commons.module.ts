import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from './directive/number.directive';
import { DataPipe } from './pipe/data.pipe';



@NgModule({
  declarations: [NumberDirective, DataPipe],
  imports: [
    CommonModule
  ],
  exports :[NumberDirective, DataPipe]
})
export class CommonsModule { }
