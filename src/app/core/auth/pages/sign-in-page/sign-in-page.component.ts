import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgIf} from '@angular/common';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../../services/auth.service';
import {LoadingService} from '../../../services/loading.service';
import {SnackbarService, SnackbarType} from '../../../services/snackbar.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {APP_ROUTES} from '../../../../app.routes';

@Component({
  selector: 'app-sign-in-page',
  imports: [ReactiveFormsModule, RouterLink, FontAwesomeModule, NgIf, MatSnackBarModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {
  signInForm: FormGroup;
  hidePassword = true;
  error: string | null = null;
  protected readonly faGoogle = faGoogle;
  protected readonly faFacebook = faFacebook;
  protected readonly faLock = faLock;
  protected readonly faEnvelope = faEnvelope;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private library: FaIconLibrary,
    private authService: AuthService,
    protected loadingService: LoadingService,
    private snackbar: SnackbarService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  onSubmit() {
    this.error = null;
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    this.loadingService.show();
    this.authService.signIn(this.signInForm.value).subscribe({
      next: () => {
        this.loadingService.hide();
        this.snackbar.show('Sign-in successful!', SnackbarType.Success);
        this.router.navigate([APP_ROUTES.PROFILE.DASHBOARD]).then(() => {
          this.snackbar.show('Welcome back!', SnackbarType.Success);
        }).catch(err => {
          console.error('Navigation error:', err);
          this.snackbar.show('Navigation error. Please try again.', SnackbarType.Error);
        });
      },
      error: () => {
        this.loadingService.hide();
        this.error = 'Invalid email or password.';
        this.snackbar.show('Invalid email or password.', SnackbarType.Error);
      }
    });
  }

  signInWithGoogle() {
    this.error = 'Google sign-in is not implemented yet.';
  }

  signInWithFacebook() {
    this.error = 'Facebook sign-in is not implemented yet.';
  }

  navigateToSignUp() {
    this.router.navigate([APP_ROUTES.AUTH.SIGN_UP]).then(r =>
      this.snackbar.show('Please sign up to continue.', SnackbarType.Info)
    );
  }

  navigateToForgotPassword() {
    this.router.navigate([APP_ROUTES.AUTH.FORGOT_PASSWORD]).then(r =>
      this.snackbar.show('Please reset your password.', SnackbarType.Info)
    );
  }
}
