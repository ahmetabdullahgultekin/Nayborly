import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../core/interfaces/user';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {environment} from '../../../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';

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

  constructor(private http: HttpClient, private dialog: MatDialog) {
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

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { ...user }
    });
    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        const updatedUsers = this.users.map(u => u === user ? result : u);
        this.http.put(environment.jsonBin.bins.usersBin.url, { users: updatedUsers }, {
          headers: {
            'X-Access-Key': environment.jsonBin.secret
          }
        }).subscribe({
          next: () => {
            this.users = updatedUsers;
            console.log('Updated user:', result);
          },
          error: (err) => {
            console.error('Failed to update user:', err);
            alert('Failed to update user. Please try again.');
          }
        });
      }
    });
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
      const updatedUsers = this.users.filter(u => u !== user);
      this.http.put(environment.jsonBin.bins.usersBin.url, { users: updatedUsers }, {
        headers: {
          'X-Access-Key': environment.jsonBin.secret
        }
      }).subscribe({
        next: () => {
          this.users = updatedUsers;
          console.log('Deleted user:', user);
        },
        error: (err) => {
          console.error('Failed to delete user:', err);
          alert('Failed to delete user. Please try again.');
        }
      });
    }
  }
}
