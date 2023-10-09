import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { BookService } from 'src/app/shared/services/book.service';
import { createBookActions } from '../store/actions';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers';
import { selectUser } from 'src/app/shared/store/user/user.reducers';

@Component({
  selector: 'createBook',
  templateUrl: './createBook.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BackendErrorMessages,
  ],
})
export class CreateBookComponent {
  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    description: ['', Validators.required],
    pdf: [null, Validators.required],
    image: [null],
  });
  createBookData$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    user: this.store.select(selectUser),
  });
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private bookService: BookService
  ) {}

  @ViewChild('fileImageInput') fileImageInput!: ElementRef;
  @ViewChild('filePDFInput') filePDFInput!: ElementRef;
  fileSizeError: string | null = null;
  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const image = files[0];
      if (image.size > 1024 * 1024) {
        this.fileSizeError = 'File size should be less than 1MB.';
        this.fileImageInput.nativeElement.value = '';
      } else {
        this.fileSizeError = null;
        this.form.patchValue({ image: image });
      }
    }
  }
  onAddPDFFile(event: any) {
    const files = event.target.files;
    const pdf = files[0];
    this.form.patchValue({ pdf: pdf });
  }
  onSubmit() {
    this.createBookData$.subscribe(({ user }) => {
      if (user) {
        const formData = new FormData();
        formData.append('title', this.form.get('title')?.value || '');
        formData.append('author', this.form.get('author')?.value || '');
        formData.append(
          'description',
          this.form.get('description')?.value || ''
        );
        formData.append('image', this.form.get('image')?.value || '');
        formData.append('pdf', this.form.get('pdf')?.value || '');
        formData.append('userId', user.id.toString());

        this.bookService
          .createBook(formData)
          .subscribe(() => this.router.navigate(['/favoriteBooks']));
      }
    });
  }
}
