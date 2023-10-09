import { BookInterface } from './book.interface';
import { UserInterface } from './user.interface';

export interface RatingInterface {
  id: string;
  value: number;
  user: UserInterface;
  book: BookInterface;
  createdAt: Date;
  updatedAt: Date;
}
