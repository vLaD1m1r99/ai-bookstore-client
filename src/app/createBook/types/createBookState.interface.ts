import { BookInterface } from 'src/app/shared/types/book.interface';

export interface CreateBookStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  validationErrors: string | null;
  book: BookInterface | null;
}
