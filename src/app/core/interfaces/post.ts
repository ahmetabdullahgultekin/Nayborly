import {User} from './user';

export interface Post {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  price: number;
  tags: string[];
  rating: number;
  views: number;
  location: string;
  category: ListingCategory;
  status: ListingStatus;
}

export enum ListingCategory {
  All = 'All',
  Help = 'Help',
  Items = 'Items',
  Events = 'Events'
}

export enum ListingStatus {
  All = 'All',
  Open = 'Open',
  Closed = 'Closed'
}

export enum ListingSort {
  Newest = 'Newest',
  Oldest = 'Oldest',
  Popular = 'Popular',
  LeastPopular = 'LeastPopular',
  PriceLowToHigh = 'PriceLowToHigh',
  PriceHighToLow = 'PriceHighToLow',
  HighestRated = 'HighestRated',
  LowestRated = 'LowestRated'
}

export interface PostFilter {
  category?: ListingCategory;
  status?: ListingStatus;
  sort?: ListingSort;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  minRating?: number;
}
