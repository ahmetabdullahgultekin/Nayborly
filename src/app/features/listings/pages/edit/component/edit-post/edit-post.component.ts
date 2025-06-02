import {Component} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingComponent} from '../../../../../../shared/loading/loading.component';
import {LoadingService} from '../../../../../../core/services/loading.service';
import {ListingCategory, ListingStatus} from '../../../../../../core/interfaces/post';
import {APP_ROUTES} from '../../../../../../app.routes';
import {ListingsService} from '../../../../data-access/listings.service';

@Component({
  selector: 'app-edit-post',
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    LoadingComponent
  ],
  templateUrl: './edit-post.component.html',
  standalone: true,
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {
  editForm: FormGroup;
  loading = false;
  success: string | null = null;
  error: string | null = null;
  imageUrl: string | null = null;
  id: string = '';
  categories = Object.values(ListingCategory);
  statuses = Object.values(ListingStatus);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    protected loadingService: LoadingService,
    private listingsService: ListingsService
  ) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      status: ['Open', Validators.required],
      tags: [''],
      image: [null],
      imageUrl: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb', Validators.required]
    });
  }

  get title() {
    return this.editForm.get('title');
  }

  get description() {
    return this.editForm.get('description');
  }

  get category() {
    return this.editForm.get('category');
  }

  get status() {
    return this.editForm.get('status');
  }

  get tags() {
    return this.editForm.get('tags');
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.editForm.patchValue({image: file});
      const reader = new FileReader();
      reader.onload = e => this.imageUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.success = null;
    this.error = null;
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const updatedPost = this.editForm.value;
    this.listingsService.updateListingInBin({...updatedPost, id: this.id}).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Listing updated successfully!';
        setTimeout(() => this.router.navigate(['/listings']), 1500);
      },
      error: (err: any) => {
        this.loading = false;
        this.error = 'Failed to update listing.';
        console.error('Update error:', err);
      }
    });
  }

  onCancel() {
    this.router.navigate([APP_ROUTES.LISTINGS.LIST]).then(r => {
      if (r) {
        this.success = 'Changes discarded.';
      }
    });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this listing?')) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.success = null;
        this.router.navigate(['/listings']).then(r => {
          if (r) {
            this.success = 'Listing deleted successfully!';
          }
        });
      }, 1000);
    }
  }
}
