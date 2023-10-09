import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../bookCard/bookCard.component';
import { BookInterface } from '../../types/book.interface';

@Component({
  selector: 'mc-book-list',
  templateUrl: './bookList.component.html',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
})
export class BookListComponent {
  @Input() books: BookInterface[] = [];
  constructor() {}
}
