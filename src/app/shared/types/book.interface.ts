import { RatingInterface } from './rating.interface';
import { UserInterface } from './user.interface';

export interface BookInterface {}
export type BookGenres = (
  | 'horror'
  | 'mystery'
  | 'romance'
  | 'science-fiction'
  | 'fantasy'
)[];

export interface BookInterface {
  id: string;
  title: string;
  description: string;
  genre: BookGenres;
  ratings: RatingInterface[] | null;
  averageRating: number | null;
  author: string | null;
  image: string | null;
  pdf: string;
  audio: string | null;
  comments: Comment[] | null;
  users: UserInterface[] | null;
  createdAt: Date;
  updatedAt: Date;
}
