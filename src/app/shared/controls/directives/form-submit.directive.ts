import {Directive, HostListener, input} from '@angular/core';
import {Subject} from "rxjs";
import {FormGroup} from "@angular/forms";

@Directive({
  selector: 'form[formGroup]',
  standalone: true,
})
export class FormSubmitDirective {
  public formGroup = input<FormGroup>();

  public readonly formSubmit$ = new Subject<void>();

  @HostListener('submit') listenOnSubmit() {
    this.formGroup()?.markAllAsTouched();
    this.formSubmit$.next();
  }
}
