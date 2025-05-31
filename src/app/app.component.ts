import {Component} from '@angular/core';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nayborly';
}
