import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../interfaces/user';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {APP_ROUTES} from '../../app.routes';
import {SnackbarService, SnackbarType} from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: SnackbarService
  ) {
  }

  signUp(form: Partial<User>): Observable<User> {
    return this.http.get<any>(
      environment.jsonBin.bins.usersBin.url,
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).pipe(
      map(data => {
        // If data.record is an array, use it directly; otherwise, fallback to data.record?.users or []
        const users: User[] = Array.isArray(data.record) ? data.record : (data.record?.users || []);
        return {users, record: data.record};
      }),
      switchMap(({users, record}) => {
        if (users.find((u: User) => u.email === form.email)) {
          return throwError(() =>
            new Error('Email already exists. Please use a different email address.'));
        }
        const newUser: User = {
          ...form,
          id: Date.now().toString(),
          avatarUrl: form.avatarUrl || 'https://i.pravatar.cc/150?img=10',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          phone: form.phone || '',
          address: form.address || '',
          city: form.city || '',
          state: form.state || '',
          zipCode: form.zipCode || ''
        } as User;
        const updatedUsers = [...users, newUser];
        // Save as array, not as { ...record, users: updatedUsers }
        return this.http.put(
          environment.jsonBin.bins.usersBin.url,
          updatedUsers,
          {headers: {'X-Access-Key': environment.jsonBin.secret}}
        ).pipe(
          map(() => newUser)
        );
      }),
      catchError(err => throwError(() => {
        this.snackbar.show('Sign-up failed. Please try again.', SnackbarType.Error);
        return err;
      })),
    );
  }

  signIn(form: { email: string; password: string }): Observable<User> {
    return this.http.get<any>(
      environment.jsonBin.bins.usersBin.url,
      {headers: {'X-Access-Key': environment.jsonBin.secret}}
    ).pipe(
      map(data => Array.isArray(data.record) ? data.record : (data.record?.users || [])),
      map((users: User[]) => users.find(u => u.email === form.email && u.password === form.password)),
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', btoa(`${user.email}:${user.password}`));
          this.navigateToDashboard();
        }
      }),
      switchMap(user => user ? of(user) : throwError(() => new Error('Invalid email or password.'))),
      catchError(err => throwError(() => err)),
      tap({
        error: (err) => {
          console.error('Sign-in error:', err);
        }
      })
    );
  }

  signOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.navigateToLogin();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user') && !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) as User : null;
  }

  private navigateToDashboard() {
    this.router.navigate([APP_ROUTES.PROFILE.DASHBOARD]).then(result => {
      if (result) {
        console.log('Navigation to dashboard successful.');
      } else {
        console.log('Already on dashboard route, no navigation performed.');
      }
    })
      .catch(err => {
        console.error('Navigation error:', err);
        this.snackbar.show('Navigation error. Please try again.', SnackbarType.Error);
      });
  }

  private navigateToLogin() {
    this.router.navigate([APP_ROUTES.AUTH.SIGN_IN]).then(r =>
      this.snackbar.show('Please sign in to continue.', SnackbarType.Info)
    ).catch(err => {
      console.error('Navigation error:', err);
      this.snackbar.show('Navigation error. Please try again.', SnackbarType.Error);
    });
  }
}




