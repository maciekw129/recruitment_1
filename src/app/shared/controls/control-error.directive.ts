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
import { combineLatest, defer, startWith, Subject, tap } from 'rxjs';
import { ErrorComponent } from "../components/error/error.component";

@Directive({
  selector: '[formControl]',
  standalone: true,
})
export class ControlErrorDirective implements OnInit {
  private errorComponent!: ComponentRef<ErrorComponent>;

  private readonly control = inject(FormControlDirective);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  @HostListener('blur') listenOnBlur() {
    this.blurEvent$.next();
  }

  private blurEvent$ = new Subject<void>();

  private listenControlStatusChange$ = defer(() => combineLatest([this.control.statusChanges!.pipe(startWith(this.control.status)), this.blurEvent$]).pipe(
    takeUntilDestroyed(this.destroyRef),
    tap(([status]) => this.updateErrorMessage(status)),
  ))

  ngOnInit(): void {
    this.instantiateErrorComponent();
    this.listenControlStatusChange$.subscribe();
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
