import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.less']
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) { }

  // Handles the confirmation action.
  // Closes the dialog and executes the provided function if available.
  onConfirm(): void {
    this.dialogRef.close(true);
    if (this.data.onConfirm) {
      this.data.onConfirm(); // Call the function passed as a parameter
    }
  }

  // Handles the cancellation action.
  // Closes the dialog without executing any additional action.
  onCancel(): void {
    this.dialogRef.close(false);
  }
}


// Interface to define the data structure for the ConfirmationDialogComponent.
export interface ConfirmationDialogData {
  title: string;
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm?: () => void; // Optional function to be executed on confirmation
}