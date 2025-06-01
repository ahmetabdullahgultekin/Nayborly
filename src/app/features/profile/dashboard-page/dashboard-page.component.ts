import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {APP_ROUTES} from '../../../app.routes';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/interfaces/user';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

  isAdmin = false;
  currentUser: User | null = null;
  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current user:', this.currentUser);
    this.isAdmin = this.currentUser?.role === 'admin';
  }

  logout() {
    this.authService.signOut();
  }
}
