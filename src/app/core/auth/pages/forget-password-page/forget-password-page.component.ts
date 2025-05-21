import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-forget-password-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FontAwesomeModule, NgIf],
  templateUrl: './forget-password-page.component.html',
  styleUrl: './forget-password-page.component.css'
})
export class ForgetPasswordPageComponent {
  forgotForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;
  protected readonly faEnvelope = faEnvelope;

  constructor(private fb: FormBuilder, private router: Router, faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faEnvelope);
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotForm.get('email');
  }

  onSubmit() {
    this.error = null;
    this.success = null;
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      this.success = 'If an account with that email exists, a password reset link has been sent.';
    }, 1200);
  }
}
