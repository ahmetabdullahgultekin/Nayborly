import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../core/interfaces/user';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-dashboard-users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<any>(
      environment.jsonBin.bins.usersBin.url,
      {
        headers: {
          'X-Access-Key': environment.jsonBin.secret
        }
      })
      .subscribe(data => {
        // Handle both possible structures
        if (Array.isArray(data.record)) {
          this.users = data.record;
        } else if (Array.isArray(data.record?.users)) {
          this.users = data.record.users;
        } else {
          this.users = [];
        }
        this.loading = false;
      }, () => {
        this.users = [];
        this.loading = false;
      });
  }
}
