import { RatingInterface } from './rating.interface';
import { BookInterface } from './book.interface';

export interface UserInterface {
  id: string;
  email: string;
  password: string;
  name: string;
  picture: string | null;
  ratings: RatingInterface[];
  comments: Comment[];
  books: BookInterface[];
  createdAt: Date;
  updatedAt: Date;
}
