import {Component} from '@angular/core';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, HttpClientModule, NgIf],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nayborly';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    });
  }

  isDashboardRoute() {
    // Check if the current route is the dashboard route
    const currentUrl = window.location.pathname;
    return currentUrl.includes('/dashboard');
  }
}
