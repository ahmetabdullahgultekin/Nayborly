import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {Post} from '../../../../core/interfaces/post';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  styleUrls: ['./edit-post-dialog.component.css']
})
export class EditPostDialogComponent {
  form: FormGroup;
  statuses = ['active', 'inactive', 'pending'];

  constructor(
    public dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [data.title, Validators.required],
      status: [data.status, Validators.required],
      category: [data.category],
      // Add more fields as needed
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const updatedPost: Post = {
        ...this.data,
        ...this.form.value
      };
      this.dialogRef.close(updatedPost);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

