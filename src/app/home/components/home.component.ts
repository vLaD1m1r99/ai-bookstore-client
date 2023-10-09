import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectBooks } from 'src/app/shared/store/books/book.reducer';
import { BookService } from 'src/app/shared/services/book.service';
import { bookActions } from 'src/app/shared/store/books/book.actions';
import { BookListComponent } from 'src/app/shared/components/bookList/bookList.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, BookListComponent],
})
export class HomeComponent {
  homeData$ = combineLatest({
    books: this.store.select(selectBooks),
  });

  constructor(private bookService: BookService, private store: Store) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => {
      this.store.dispatch(bookActions.setBooks({ books }));
    });
  }
}
