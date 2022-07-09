import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumber]'
})
export class NumberDirective {

  constructor(private el: ElementRef, private control : NgControl) {}

  @HostListener('input',['$event']) onEvent($event){
    let modifyValue = this.el.nativeElement.value;
    modifyValue = String(modifyValue).replace(/\D/g, '');

    if(modifyValue==null){
      modifyValue = 0;
    }

    this.control.control.setValue(modifyValue);
  }

}
