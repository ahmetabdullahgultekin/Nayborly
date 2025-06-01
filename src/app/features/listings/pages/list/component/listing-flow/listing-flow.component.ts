import {Component, computed, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CurrencyPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';
import {LoadingComponent} from '../../../../../../shared/loading/loading.component';
import {LoadingService} from '../../../../../../core/services/loading.service';
import {SnackbarService, SnackbarType} from '../../../../../../core/services/snackbar.service';
import {ListingCategory, ListingSort, ListingStatus, Post} from '../../../../../../core/interfaces/post';
import {User} from '../../../../../../core/interfaces/user';

@Component({
  selector: 'app-listing-flow',
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    LoadingComponent,
    DatePipe,
    NgOptimizedImage,
    CurrencyPipe
  ],
  templateUrl: './listing-flow.component.html',
  standalone: true,
  styleUrl: './listing-flow.component.css'
})
export class ListingFlowComponent {
  listings = signal<Post[]>([]);
  search = signal('');
  category = signal<ListingCategory>(ListingCategory.All);
  status = signal<ListingStatus>(ListingStatus.All);
  sort = signal<ListingSort>(ListingSort.Newest);
  location = signal<string>('');
  minDate = signal<string>('');
  maxDate = signal<string>('');
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  tags = signal<string[]>([]);
  minRating = signal<number | null>(null);
  hoveredStar = 0;

  sortOptions = Object.values(ListingSort);
  categoryOptions = Object.values(ListingCategory);
  statusOptions = Object.values(ListingStatus);

  // Pagination properties
  currentPage = signal(1);
  pageSize = signal(6);
  filteredListings = computed(() => {
    let filtered = this.listings();
    const search = this.search().toLowerCase();
    if (search) {
      filtered = filtered.filter(l =>
        l.title?.toLowerCase().includes(search) ||
        l.description?.toLowerCase().includes(search)
      );
    }
    if (this.category() !== ListingCategory.All) {
      filtered = filtered.filter(l => l.category === this.category());
    }
    if (this.status() !== ListingStatus.All) {
      filtered = filtered.filter(l => l.status === this.status());
    }
    if (this.location()) {
      filtered = filtered.filter(l => l.location?.toLowerCase().includes(this.location().toLowerCase()));
    }
    if (this.minDate()) {
      filtered = filtered.filter(l => new Date(l.createdAt) >= new Date(this.minDate()));
    }
    if (this.maxDate()) {
      filtered = filtered.filter(l => new Date(l.createdAt) <= new Date(this.maxDate()));
    }
    if (this.minPrice() != null) {
      filtered = filtered.filter(l => l.price >= (this.minPrice() ?? 0));
    }
    if (this.maxPrice() != null) {
      filtered = filtered.filter(l => l.price <= (this.maxPrice() ?? Number.MAX_SAFE_INTEGER));
    }
    if (this.tags().length > 0) {
      filtered = filtered.filter(l => this.tags().every(tag => l.tags?.includes(tag)));
    }
    if (this.minRating() != null) {
      filtered = filtered.filter(l => (l.rating || 0) >= (this.minRating() ?? 0));
    }
    if (this.sort() === ListingSort.Newest) {
      filtered = filtered.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (this.sort() === ListingSort.Oldest) {
      filtered = filtered.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (this.sort() === ListingSort.Popular) {
      filtered = filtered.slice().sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (this.sort() === ListingSort.LeastPopular) {
      filtered = filtered.slice().sort((a, b) => (a.views || 0) - (b.views || 0));
    } else if (this.sort() === ListingSort.PriceLowToHigh) {
      filtered = filtered.slice().sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (this.sort() === ListingSort.PriceHighToLow) {
      filtered = filtered.slice().sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (this.sort() === ListingSort.HighestRated) {
      filtered = filtered.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (this.sort() === ListingSort.LowestRated) {
      filtered = filtered.slice().sort((a, b) => (a.rating || 0) - (b.rating || 0));
    }
    return filtered;
  });
  totalListings = computed(() => this.filteredListings().length);
  totalPages = computed(() => Math.ceil(this.totalListings() / this.pageSize()));
  pagedListings = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredListings().slice(start, start + this.pageSize());
  });
  userMap: Record<string, User> = {};

  constructor(
    protected loadingService: LoadingService,
    private snackbarService: SnackbarService,
    private http: HttpClient
  ) {
    this.loadingService.show();
    this.http.get<any>(
      environment.jsonBin.bins.listingsBin.url,
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).subscribe(
      data => {
        // Ensure all posts have a valid rating and price, and reset pagination on new data
        const listingsWithDefaults = (Array.isArray(data.record) ? data.record : []).map((item: Post, idx: number) => ({
          ...item,
          price: typeof item.price === 'number' ? item.price : 100 + idx * 10,
          rating: typeof item.rating === 'number' ? item.rating : (idx % 5 + 1) - (idx % 2 === 0 ? 0.5 : 0)
        }));
        this.listings.set(listingsWithDefaults);
        this.currentPage.set(1); // Reset to first page on new data
        this.snackbarService.show('Listings loaded successfully', SnackbarType.Success);
        this.loadingService.hide();
        // Fetch users after listings
        this.fetchUsers();
      },
      error => {
        this.snackbarService.show('Failed to load listings', SnackbarType.Error);
        console.error('Error loading listings:', error);
        this.loadingService.hide();
      }
    );
  }

  fetchUsers() {
    this.http.get<any>(environment.jsonBin.bins.usersBin.url, {headers: {'X-Access-Key': environment.jsonBin.secret}})
      .subscribe(data => {
        const users: User[] = Array.isArray(data.record) ? data.record : (data.record?.users || []);
        this.userMap = users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as Record<string, User>);
      });
  }

  getUserById(userId: string): User | undefined {
    return this.userMap[userId];
  }

  prevPage() {
    if (this.currentPage() > 1) this.currentPage.set(this.currentPage() - 1);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.set(this.currentPage() + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  appliedFilters() {
    const filters = [];
    if (this.category() !== ListingCategory.All) filters.push(`Category: ${this.category()}`);
    if (this.status() !== ListingStatus.All) filters.push(`Status: ${this.status()}`);
    if (this.sort() !== ListingSort.Newest) filters.push(`Sort: ${this.sort()}`);
    if (this.minPrice() != null) filters.push(`Min Price: ${this.minPrice()}`);
    if (this.maxPrice() != null) filters.push(`Max Price: ${this.maxPrice()}`);
    if (this.tags().length) filters.push(`Tags: ${this.tags().join(', ')}`);
    if (this.minRating() != null) filters.push(`Min Rating: ${this.minRating()}`);
    return filters.length ? filters.join(' | ') : 'None';
  }

  resetFilters() {
    this.category.set(ListingCategory.All);
    this.status.set(ListingStatus.All);
    this.sort.set(ListingSort.Newest);
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.tags.set([]);
    this.minRating.set(null);
    this.search.set('');
  }

  onTagsInput(event: Event) {
    const value = ((event.target as HTMLInputElement).value || '') as string;
    this.tags.set(value.split(',').map((t: string) => t.trim()).filter((t: string) => t));
  }
}
