import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter } from 'rxjs';
import { selectUser } from '../../store/user/user.reducers';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'mc-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, DropdownComponent],
})
export class Navbar {
  data$ = combineLatest({
    user: this.store.select(selectUser),
  });

  title = '';

  @ViewChild(DropdownComponent, { static: false })
  dropdownComponent!: DropdownComponent;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const pageTitle = this.getPageTitle(this.activatedRoute.root);
        this.title = pageTitle || '';
      });
  }

  private getPageTitle(route: ActivatedRoute): string {
    let title = '';
    while (route.firstChild) {
      route = route.firstChild;
      if (route.snapshot.data['title']) {
        title = route.snapshot.data['title'];
      }
    }
    return title;
  }

  toggleDropdown() {
    this.dropdownComponent.toggleDropdown();
  }

  isAuthRoute(): boolean {
    return this.router.url === '/signin' || this.router.url === '/signup';
  }

  signin(): void {
    this.router.navigate(['/signin']);
  }

  signout(): void {
    this.dropdownComponent.toggleDropdown();
    this.authService.signout();
    this.router.navigate(['/']);
  }
}
