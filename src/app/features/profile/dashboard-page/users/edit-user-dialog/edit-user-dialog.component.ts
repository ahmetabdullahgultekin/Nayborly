import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {User} from '../../../../../core/interfaces/user';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    // Angular Material modules
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  form: FormGroup;
  roles = ['user', 'admin'];
  statuses = ['Active', 'Inactive'];

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      role: [data.role || 'user', Validators.required],
      status: [data.lastLogin ? 'Active' : 'Inactive', Validators.required],
      createdAt: [data.createdAt, Validators.required]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const updatedUser: User = {
        ...this.data,
        name: formValue.name,
        email: formValue.email,
        role: formValue.role,
        lastLogin: formValue.status === 'Active' ? (this.data.lastLogin || new Date().toISOString()) : undefined,
        createdAt: formValue.createdAt
      };
      this.dialogRef.close(updatedUser);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
