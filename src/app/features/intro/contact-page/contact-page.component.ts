import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ContactService} from '../../../core/services/contact.service';
import {SnackbarService, SnackbarType} from "../../../core/services/snackbar.service";

@Component({
  selector: 'app-contact-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {
  contactForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private snackbar: SnackbarService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) return;
    this.submitting = true;
    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: () => {
        this.snackbar.show('Your message has been sent!', SnackbarType.Success);
        this.contactForm.reset();
        this.submitting = false;
      },
      error: () => {
        this.snackbar.show('There was an error sending your message. Please try again.', SnackbarType.Error);
        this.submitting = false;
      }
    });
  }
}
