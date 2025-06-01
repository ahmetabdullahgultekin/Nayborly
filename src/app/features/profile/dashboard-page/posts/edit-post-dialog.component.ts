import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {Post, ListingCategory, ListingStatus} from '../../../../core/interfaces/post';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgForOf
  ],
  styleUrls: ['./edit-post-dialog.component.css']
})
export class EditPostDialogComponent {
  form!: FormGroup;
  filteredStatuses: string[] = [];
  filteredCategories: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filteredStatuses = Object.values(ListingStatus).filter(s => s !== ListingStatus.All);
    this.filteredCategories = Object.values(ListingCategory).filter(c => c !== ListingCategory.All);
    this.form = this.fb.group({
      title: [this.data.title, Validators.required],
      status: [this.data.status ?? this.filteredStatuses[0], Validators.required],
      category: [this.data.category ?? this.filteredCategories[0], Validators.required],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      // Only update the fields that are present in the form, keep the rest of the post data
      const updatedPost: Post = {
        ...this.data,
        ...this.form.value,
        // Ensure fields not in the form are preserved
        description: this.data.description,
        createdAt: this.data.createdAt,
        updatedAt: new Date().toISOString(),
        userId: this.data.userId,
        price: this.data.price,
        tags: this.data.tags,
        rating: this.data.rating,
        views: this.data.views,
        location: this.data.location
      };
      this.dialogRef.close(updatedPost);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
