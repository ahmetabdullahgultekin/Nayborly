import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../../core/interfaces/post';
import {environment} from '../../../../../environments/environment';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../../../core/services/auth.service';
import {User} from '../../../../core/interfaces/user';
import {MatDialog} from '@angular/material/dialog';
import {EditPostDialogComponent} from './edit-post-dialog.component';

@Component({
  selector: 'app-dashboard-posts',
  standalone: true,
  templateUrl: './posts.component.html',
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  currentUser: User | null = null;
  isAdmin = false;

  constructor(private http: HttpClient, private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.currentUser?.role === 'admin';
    this.http.get<any>(
      environment.jsonBin.bins.listingsBin.url,
      {
        headers: {
          'X-Access-Key': environment.jsonBin.secret
        }
      })
      .subscribe(data => {
        let posts: Post[] = [];
        if (Array.isArray(data.record)) {
          posts = data.record;
        } else if (Array.isArray(data.record?.posts)) {
          posts = data.record.posts;
        }
        // Only show posts belonging to the current user if not admin
        if (!this.isAdmin && this.currentUser) {
          posts = posts.filter(post => post.userId === this.currentUser?.id);
        }
        this.posts = posts.map(post => ({
          ...post,
          category: post.category || '',
          status: post.status || ''
        }));
        this.loading = false;
      }, () => {
        this.posts = [];
        this.loading = false;
      });
  }

  editPost(post: Post): void {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '400px',
      data: {...post}
    });
    dialogRef.afterClosed().subscribe((result: Post | undefined) => {
      if (result) {
        // Always update the full posts array, not just the edited post
        const allPosts = this.isAdmin
          ? this.posts
          : [...this.posts]; // fallback for non-admin, but should be all posts for admin
        const updatedPosts = allPosts.map(p => p.id === result.id ? result : p);
        this.http.put(environment.jsonBin.bins.listingsBin.url, updatedPosts, {
          headers: {
            'X-Access-Key': environment.jsonBin.secret
          }
        }).subscribe({
          next: () => {
            this.posts = updatedPosts;
          },
          error: () => {
            alert('Failed to update post. Please try again.');
          }
        });
      }
    });
  }

  deletePost(post: Post): void {
    if (confirm(`Are you sure you want to delete the post titled "${post.title}"?`)) {
      const updatedPosts = this.posts.filter(p => p !== post);
      this.http.put(environment.jsonBin.bins.listingsBin.url, updatedPosts, {
        headers: {
          'X-Access-Key': environment.jsonBin.secret
        }
      }).subscribe({
        next: () => {
          this.posts = updatedPosts;
        },
        error: () => {
          alert('Failed to delete post. Please try again.');
        }
      });
    }
  }
}
