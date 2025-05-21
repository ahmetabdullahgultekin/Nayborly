import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faEnvelope, faLock, faSpinner, faUser} from '@fortawesome/free-solid-svg-icons';
import {NgIf} from '@angular/common';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FontAwesomeModule, NgIf],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {
  signUpForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  error: string | null = null;
  success: string | null = null;
  protected readonly faUser = faUser;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faLock = faLock;
  protected readonly faGoogle = faGoogle;
  protected readonly faFacebook = faFacebook;
  protected readonly faSpinner = faSpinner;

  constructor(private fb: FormBuilder, private router: Router, faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faUser, faEnvelope, faLock, faGoogle, faFacebook, faSpinner);
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, {validators: this.passwordsMatchValidator});
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get terms() {
    return this.signUpForm.get('terms');
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordsMismatch: true};
  }

  onSubmit() {
    this.error = null;
    this.success = null;
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.success = 'Account created successfully! Redirecting to sign in...';
      setTimeout(() => this.router.navigate(['/auth/sign-in']), 1800);
    }, 1200);
  }

  signInWithGoogle() {
    this.error = 'Google sign-up is not implemented yet.';
  }

  signInWithFacebook() {
    this.error = 'Facebook sign-up is not implemented yet.';
  }
}
