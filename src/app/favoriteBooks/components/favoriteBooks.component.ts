import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { BookListComponent } from 'src/app/shared/components/bookList/bookList.component';
import { selectBooks } from '../../shared/store/favoriteBooks/favoriteBooks.reducers';
import { UserService } from 'src/app/shared/services/user.services';
import { favoriteBooksActions } from '../../shared/store/favoriteBooks/favoriteBooks.actions';

@Component({
  selector: 'favoriteBooks',
  templateUrl: './favoriteBooks.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, BookListComponent],
})
export class FavoriteBooksComponent {
  favoriteBooksData$ = combineLatest({
    books: this.store.select(selectBooks),
  });

  constructor(private userService: UserService, private store: Store) {}

  ngOnInit() {
    this.userService.getFavoriteBooks().subscribe((books) => {
      this.store.dispatch(favoriteBooksActions.setBooks({ books }));
    });
  }
}
