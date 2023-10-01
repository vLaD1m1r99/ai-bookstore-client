import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SigninComponent {
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) {}

  showPassword: boolean = false;
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log('form', this.form.getRawValue());
  }
}
