import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { BookInterface } from '../../types/book.interface';

@Component({
  selector: 'mc-rating',
  templateUrl: './rating.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class RatingComponent {
  @Input() averageRating: number | null = null;
  @Input() currentRating: number = 0;
  @Output() ratingChanged = new EventEmitter<number>();

  ratings: { value: number; label: string }[] = [
    { value: 1, label: 'Bad' },
    { value: 2, label: 'Poor' },
    { value: 3, label: 'OK' },
    { value: 4, label: 'Good' },
    { value: 5, label: 'Excellent' },
  ];

  rateBook(ratingValue: number): void {
    this.currentRating = ratingValue;
    this.ratingChanged.emit(ratingValue);
  }
}
