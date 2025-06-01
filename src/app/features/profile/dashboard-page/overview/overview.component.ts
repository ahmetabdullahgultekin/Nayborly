import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ContactService} from '../../../../core/services/contact.service';
import {LoadingService} from '../../../../core/services/loading.service';
import {APP_ROUTES} from '../../../../app.routes';
import {environment} from '../../../../../environments/environment';
import {NgIf} from '@angular/common';
import {LoadingComponent} from '../../../../shared/loading/loading.component';
import {AuthService} from '../../../../core/services/auth.service';
import {User} from '../../../../core/interfaces/user';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  imports: [
    RouterLink,
    LoadingComponent,
    NgIf,
  ],
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  postsCount = 0;
  usersCount = 0;
  contactMessagesCount = 0;
  isAdmin = false;
  currentUser: User | null = null;
  currentYear = new Date().getFullYear();
  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(
    private http: HttpClient,
    private contactService: ContactService,
    protected loadingService: LoadingService,
    private authService: AuthService
  ) {
  }

  get user() {
    return this.currentUser;
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.currentUser?.role === 'admin';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Access-Key': environment.jsonBin.secret,
    });
    let completed = 0;
    const finish = () => {
      completed++;
      if (completed === (this.isAdmin ? 3 : 1)) this.loadingService.hide();
    };
    // Fetch posts (listings)
    this.http.get<any>(environment.jsonBin.bins.listingsBin.url, {headers}).subscribe(data => {
      const posts = Array.isArray(data.record) ? data.record : [];
      if (this.isAdmin) {
        this.postsCount = posts.length;
      } else if (this.currentUser) {
        this.postsCount = posts.filter((p: any) => p.userId === this.currentUser?.id).length;
      }
      finish();
    }, finish);
    if (this.isAdmin) {
      // Fetch users
      this.http.get<any>(environment.jsonBin.bins.usersBin.url, {headers}).subscribe(data => {
        // Support both array and object with 'users' property
        const users = Array.isArray(data.record) ? data.record : (data.record?.users || []);
        this.usersCount = users.length;
        finish();
      }, finish);
      // Fetch contact messages
      this.contactService.getAllMessages().subscribe((messages: any[]) => {
        // Debug: log messages to verify data
        console.log('Contact messages fetched:', messages);
        this.contactMessagesCount = Array.isArray(messages) ? messages.length : 0;
        finish();
      }, finish);
    }
  }
}
