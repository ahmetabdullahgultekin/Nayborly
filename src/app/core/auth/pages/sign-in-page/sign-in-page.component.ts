import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgIf} from '@angular/common';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-in-page',
  imports: [ReactiveFormsModule, RouterLink, FontAwesomeModule, NgIf],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {
  signInForm: FormGroup;
  hidePassword = true;
  loading = false;
  error: string | null = null;
  protected readonly faGoogle = faGoogle;
  protected readonly faFacebook = faFacebook;
  protected readonly faLock = faLock;
  protected readonly faEnvelope = faEnvelope;

  constructor(private fb: FormBuilder, private router: Router, private library: FaIconLibrary) {
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
    this.loading = true;
    // Simulate authentication (replace with real API call)
    setTimeout(() => {
      this.loading = false;
      if (this.email?.value !== 'user@example.com' || this.password?.value !== 'password123') {
        this.error = 'Invalid email or password.';
      } else {
        // Redirect to dashboard or home
        this.router.navigate(['/dashboard']).then(r => {
          if (!r) {
            this.error = 'Navigation failed.';
          }
        });
      }
    }, 1200);
  }

  signInWithGoogle() {
    // TODO: Implement Google sign-in logic
    this.error = 'Google sign-in is not implemented yet.';
  }

  signInWithFacebook() {
    // TODO: Implement Facebook sign-in logic
    this.error = 'Facebook sign-in is not implemented yet.';
  }
}
