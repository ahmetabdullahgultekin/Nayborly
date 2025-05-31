import {User} from './user';

export interface Post {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}
