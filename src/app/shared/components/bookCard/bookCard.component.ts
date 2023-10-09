import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BookInterface } from '../../types/book.interface';

@Component({
  selector: 'mc-book-card',
  templateUrl: './bookCard.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class BookCardComponent {
  environment = environment;
  @Input() book: BookInterface | null = null;
  constructor() {}
}
