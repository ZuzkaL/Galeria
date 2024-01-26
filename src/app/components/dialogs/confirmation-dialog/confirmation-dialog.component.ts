import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.less']
})
export class ConfirmationDialogComponent{

constructor(
  public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
) { }

onConfirm(): void {
  this.dialogRef.close(true);
  if (this.data.onConfirm) {
    this.data.onConfirm(); // Call the function passed as a parameter
  }
}

onCancel(): void {
  this.dialogRef.close(false);
}
}

export interface ConfirmationDialogData {
title: string;
description: string;
confirmButtonText: string;
cancelButtonText: string;
onConfirm?: () => void; // Optional function to be executed on confirmation
}