import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectUser } from '../../store/user/user.reducers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mc-dropdown',
  templateUrl: './dropdown.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class DropdownComponent {
  dropDownData$ = combineLatest({
    user: this.store.select(selectUser),
  });
  environment = environment;
  isDropdownOpen = false;
  constructor(private store: Store) {}
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
