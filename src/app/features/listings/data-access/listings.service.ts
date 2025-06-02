import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';


@Injectable({providedIn: 'root'})
export class ListingsService {
  private apiUrl = environment.jsonBin.bins.listingsBin.url;
  private accessKey = environment.jsonBin.secret;

  constructor(private http: HttpClient) {
  }

  getListings(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: {'X-Access-Key': this.accessKey}
    });
  }

  getListingById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: {'X-Access-Key': this.accessKey}
    });
  }

  createListing(listingData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, listingData, {
      headers: {'X-Access-Key': this.accessKey}
    });
  }

  updateListing(id: string, listingData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, listingData, {
      headers: {'X-Access-Key': this.accessKey}
    });
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: {'X-Access-Key': this.accessKey}
    });
  }

  /**
   * Updates a post in the listings array and PUTs the full array to the bin (like dashboard posts)
   */
  updateListingInBin(updatedPost: any, accessKey?: string): Observable<any> {
    return new Observable(observer => {
      this.getListings().subscribe({
        next: (allPosts) => {
          // Support both { record: [...] } and plain array
          let listingsArray: any[];
          if (Array.isArray(allPosts)) {
            listingsArray = allPosts;
          } else if (allPosts && Array.isArray(allPosts.record)) {
            listingsArray = allPosts.record;
          } else if (!allPosts || Object.keys(allPosts).length === 0) {
            listingsArray = [];
          } else {
            listingsArray = [];
          }
          console.log('Listings array:', listingsArray);
          let found = false;
          const updatedPosts = listingsArray.map((p: any) => {
            if (p.id === updatedPost.id) {
              found = true;
              return {
                ...p,
                ...updatedPost,
                updatedAt: new Date().toISOString(),
                createdAt: p.createdAt ?? new Date().toISOString(),
                userId: p.userId ?? '',
                price: p.price ?? 0,
                tags: p.tags ?? [],
                rating: p.rating ?? 0,
                views: p.views ?? 0,
                location: p.location ?? '',
                description: p.description ?? '',
                category: p.category ?? '',
                status: p.status ?? 'Open',
                image: p.image ?? null,
                imageUrl: p.imageUrl ?? ''
              };
            }
            return p;
          });
          let finalPosts: any[];
          if (found) {
            finalPosts = updatedPosts;
          } else {
            // Generate a new id if not provided or if id is empty/duplicate
            let newId = updatedPost.id;
            if (!newId || listingsArray.some(p => p.id === newId)) {
              const maxId = listingsArray.reduce((max, post) => {
                const num = typeof post.id === 'string' && post.id.startsWith('p') ? parseInt(post.id.slice(1)) : 0;
                return num > max ? num : max;
              }, 0);
              newId = 'p' + String(maxId + 1).padStart(3, '0');
            }
            // Append the new post to the fetched list, not to a filtered/empty array
            finalPosts = [...listingsArray, {
              ...updatedPost,
              id: newId,
              updatedAt: new Date().toISOString(),
              createdAt: updatedPost.createdAt ?? new Date().toISOString(),
              userId: updatedPost.userId ?? '',
              price: updatedPost.price ?? 0,
              tags: updatedPost.tags ?? [],
              rating: updatedPost.rating ?? 0,
              views: updatedPost.views ?? 0,
              location: updatedPost.location ?? '',
              description: updatedPost.description ?? '',
              category: updatedPost.category ?? '',
              status: updatedPost.status ?? 'Open',
              image: updatedPost.image ?? null,
              imageUrl: updatedPost.imageUrl ?? ''
            }];
          }
          console.log('Final posts to update:', finalPosts);
          const headers = {'X-Access-Key': accessKey || this.accessKey};
          this.http.put(this.apiUrl, finalPosts, {headers}).subscribe({
            next: (res) => observer.next(res),
            error: (err) => observer.error(err),
            complete: () => observer.complete()
          });
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
