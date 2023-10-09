import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { UserService } from './shared/services/user.services';
import { Navbar } from './shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar],
})
export class AppComponent {
  title = 'ai-bookstore-client';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const user = this.authService.getUserFromToken();
    if (user) this.userService.setUserToStore(user);
  }
}
