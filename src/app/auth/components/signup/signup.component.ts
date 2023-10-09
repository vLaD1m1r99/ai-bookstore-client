import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { Router, RouterLink } from '@angular/router';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { AuthService } from '../../services/auth.service';
import { combineLatest } from 'rxjs';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BackendErrorMessages,
  ],
})
export class SignupComponent {
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    picture: [null],
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

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileSizeError: string | null = null;
  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const picture = files[0];

      if (picture.size > 1024 * 1024) {
        this.fileSizeError = 'File size should be less than 1MB.';
        this.fileInput.nativeElement.value = '';
      } else {
        this.fileSizeError = null;
        this.form.patchValue({ picture: picture });
      }
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value || '');
    formData.append('email', this.form.get('email')?.value || '');
    formData.append('password', this.form.get('password')?.value || '');
    formData.append('picture', this.form.get('picture')?.value || '');

    this.store.dispatch(authActions.signup({ request: formData }));
    this.authService
      .signup(formData)
      .subscribe(() => this.router.navigate(['/']));
  }
}
