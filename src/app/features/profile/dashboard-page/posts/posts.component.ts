import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../../core/interfaces/post';
import {environment} from '../../../../../environments/environment';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loading = true;
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
        // Ensure category and status are always present and match the filter options
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
}
