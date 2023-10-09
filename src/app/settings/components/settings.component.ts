import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
// import { authActions } from '../../store/actions';
import { Router, RouterLink } from '@angular/router';
// import {
//   selectIsSubmitting,
//   selectValidationErrors,
// } from '../../store/reducers';
// import { AuthService } from '../../services/auth.service';
import { combineLatest } from 'rxjs';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BackendErrorMessages,
  ],
})
export class SettingsComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    // private authService: AuthService,
    private router: Router
  ) {}
}
