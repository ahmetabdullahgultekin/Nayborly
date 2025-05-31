import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  faCity,
  faEnvelope,
  faFlag,
  faHashtag,
  faImage,
  faLocationDot,
  faLock,
  faPhone,
  faSpinner,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {NgIf} from '@angular/common';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {AuthService} from "../../../services/auth.service";
import {SnackbarService, SnackbarType} from "../../../services/snackbar.service";
import {LoadingService} from "../../../services/loading.service";

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
    error: string | null = null;
    success: string | null = null;
    protected readonly faUser = faUser;
    protected readonly faEnvelope = faEnvelope;
    protected readonly faLock = faLock;
    protected readonly faGoogle = faGoogle;
    protected readonly faFacebook = faFacebook;
    protected readonly faSpinner = faSpinner;
    protected readonly faPhone = faPhone;
    protected readonly faLocationDot = faLocationDot;
    protected readonly faCity = faCity;
    protected readonly faFlag = faFlag;
    protected readonly faHashtag = faHashtag;
    protected readonly faImage = faImage;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        faLibrary: FaIconLibrary,
        private authService: AuthService,
        private snackbar: SnackbarService,
        public loadingService: LoadingService
    ) {
        faLibrary.addIcons(faUser, faEnvelope, faLock, faGoogle, faFacebook, faSpinner, faPhone, faLocationDot, faCity, faFlag, faHashtag, faImage);
        this.signUpForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            phone: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]], // E.164 format
            address: [''],
            city: [''],
            state: [''],
            zipCode: [''],
            avatarUrl: ['https://i.pravatar.cc/150?img=10'], // Default avatar
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
        this.loadingService.show();
        const {
            name, email, password, phone, address, city, state, zipCode, avatarUrl
        } = this.signUpForm.value;
        this.authService.signUp({
            name,
            email,
            password,
            phone,
            address,
            city,
            state,
            zipCode,
            avatarUrl
        }).subscribe({
            next: () => {
                this.loadingService.hide();
                this.success = 'Account created successfully! Redirecting to sign in...';
                this.snackbar.show(this.success, SnackbarType.Success);
                setTimeout(() => {
                    this.router.navigate(['/auth/sign-in']);
                }, 2000);
            },
            error: (err) => {
                this.loadingService.hide();
                this.error = err.message || 'Sign up failed.';
                this.snackbar.show(this.error ?? 'Sign up failed.', SnackbarType.Error);
            }
        });
    }

    signInWithGoogle() {
        this.error = 'Google sign-up is not implemented yet.';
    }

    signInWithFacebook() {
        this.error = 'Facebook sign-up is not implemented yet.';
    }
}
