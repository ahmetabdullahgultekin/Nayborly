export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role?: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}
