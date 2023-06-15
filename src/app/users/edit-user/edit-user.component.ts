import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  updateUser = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public user: any,
    public dialogRef: MatDialogRef<EditUserComponent>) {}

    onCloseDialog(): void {
      this.dialogRef.close();
    }
}