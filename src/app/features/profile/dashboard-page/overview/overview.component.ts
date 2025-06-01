import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APP_ROUTES} from '../../../../app.routes';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  protected readonly APP_ROUTES = APP_ROUTES;
}
