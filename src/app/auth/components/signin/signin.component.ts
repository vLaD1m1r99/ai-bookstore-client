import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { authActions } from '../../store/actions';
import { SigninRequestInterface } from '../../types/signinRequest.interface';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BackendErrorMessages,
  ],
})
export class SigninComponent {
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  showPassword: boolean = false;
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const request: SigninRequestInterface = this.form.getRawValue();
    this.store.dispatch(authActions.signin({ request }));
    this.authService
      .signin(request)
      .subscribe(() => this.router.navigate(['/']));
  }
}
