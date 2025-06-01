import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {APP_ROUTES} from '../../../app.routes';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(private router: Router, private http: HttpClient) {
  }

  logout() {
    // Implement your logout logic here (e.g., call AuthService, clear tokens, etc.)
    // For now, just navigate to sign-in page
    this.router.navigate(['/auth/sign-in']).then(r => {
      // Optionally, you can add logic to clear user data or tokens here
      console.log('Logged out successfully');
    }).catch(error => {
      console.error('Logout failed', error);
      // Handle logout error (e.g., show a notification)

    });
  }
}
