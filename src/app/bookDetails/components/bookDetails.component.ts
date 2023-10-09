import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookListComponent } from 'src/app/shared/components/bookList/bookList.component';
import { UserService } from 'src/app/shared/services/user.services';
import { BookService } from 'src/app/shared/services/book.service';
import { BookInterface } from 'src/app/shared/types/book.interface';
import { environment } from 'src/environments/environment';
import { combineLatest, map } from 'rxjs';
import { selectUser } from 'src/app/shared/store/user/user.reducers';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';
import { RatingService } from 'src/app/shared/services/rating.service';
import { RatingInterface } from 'src/app/shared/types/rating.interface';

@Component({
  selector: 'bookDetails',
  templateUrl: './bookDetails.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, BookListComponent, RatingComponent],
})
export class BookDetailsComponent {
  bookDetailsData$ = combineLatest({
    user: this.store.select(selectUser),
  });

  book: BookInterface | null = null;
  rating: RatingInterface | null = null;
  environment = environment;
  isFavorite: boolean = false;
  currentRating: number = 0;

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    combineLatest([this.route.params, this.bookDetailsData$])
      .pipe(
        map(([params, favoriteBooksData]) => ({
          bookId: params['id'],
          userId: favoriteBooksData.user?.id,
        }))
      )
      .subscribe(({ bookId, userId }) => {
        this.bookService.getBook(bookId).subscribe((book) => {
          if (book) {
            this.book = book;
            if (book.users)
              this.isFavorite = book.users.some((user) => user.id === userId);
            if (userId)
              this.ratingService
                .getRating({ userId, bookId })
                .subscribe((rating) => {
                  if (rating) {
                    this.rating = rating;
                    this.currentRating = rating.value;
                  }
                });
          }
        });
      });
  }

  addFavoriteBook() {
    this.book &&
      this.userService
        .addFavoriteBook(this.book.id)
        .subscribe(() => (this.isFavorite = true));
  }

  removeFavoriteBook() {
    this.book &&
      this.userService
        .removeFavoriteBook(this.book.id)
        .subscribe(() => (this.isFavorite = false));
  }

  handleRatingChange(ratingValue: number): void {
    this.bookDetailsData$.subscribe(({ user }) => {
      if (user && this.book) {
        if (!this.rating)
          this.ratingService
            .addRating({
              user: user.id,
              book: this.book.id,
              value: ratingValue,
            })
            .subscribe((rating) => {
              this.rating = rating;
              this.currentRating = ratingValue;
              this.book?.ratings?.push(rating);
            });
        else
          this.ratingService
            .updateRating(this.rating.id, ratingValue)
            .subscribe((rating) => {
              this.rating = rating;
              this.currentRating = ratingValue;
              if (this.book?.ratings) {
                const index = this.book.ratings.findIndex(
                  (r) => r.id === rating.id
                );
                if (index !== -1) {
                  this.book.ratings[index] = rating;
                }
              }
            });
      }
    });
  }
}
