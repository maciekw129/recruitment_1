import {
  ComponentRef,
  DestroyRef,
  Directive,
  HostListener,
  inject,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { FormControlDirective, FormControlStatus } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {combineLatest, defer, distinctUntilChanged, filter, merge, startWith, Subject, tap} from 'rxjs';
import { ErrorComponent } from "../../components/error/error.component";
import {FormSubmitDirective} from "./form-submit.directive";

@Directive({
  selector: '[formControl]',
  standalone: true,
})
export class ControlErrorDirective implements OnInit {
  private errorComponent!: ComponentRef<ErrorComponent>;

  private readonly control = inject(FormControlDirective);
  private readonly formSubmitDirective = inject(FormSubmitDirective);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  @HostListener('blur') listenOnBlur() {
    this.initializeErrorState$.next();
  }

  private initializeErrorState$ = new Subject<void>();

  private listenFormSubmit$ = defer(() => this.formSubmitDirective.formSubmit$.pipe(
    tap(() => this.initializeErrorState$.next())
  ));

  private listenControlStatusChange$ = defer(() => combineLatest([this.control.statusChanges!.pipe(startWith(this.control.status)), this.initializeErrorState$]).pipe(
    filter(() => Boolean(this.control.touched)),
    distinctUntilChanged((previous, current) => JSON.stringify(previous) === JSON.stringify(current)),
    tap(([status]) => this.updateErrorMessage(status)),
  ))

  ngOnInit(): void {
    this.instantiateErrorComponent();
    merge(this.listenFormSubmit$, this.listenControlStatusChange$).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  private instantiateErrorComponent(): void {
    this.errorComponent = this.viewContainerRef.createComponent(ErrorComponent);
  }

  private updateErrorMessage(status: FormControlStatus): void {
    this.errorComponent.setInput('error', status === "INVALID" ? this.getFirstErrorMessage() : '');
  }

  private getFirstErrorMessage(): string {
    const errors = this.control.errors;
    if(errors === null) {
      return '';
    }

    return Object.keys(errors)[0];
  }
}
