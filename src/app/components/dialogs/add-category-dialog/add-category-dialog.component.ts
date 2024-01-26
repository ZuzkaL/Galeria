import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.less']
})
export class AddCategoryDialogComponent {
  name: string = "";

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private galleryApiService: GalleryApiService
  ) { }

  handleFileInput(event: Event): void {
    // Handle the file input here
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      // Perform actions with the selected file(s)
      console.log(files);
    }
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    // Perform actions with the dropped file(s)
    console.log(event);
  }

  openFileDialog(): void {
    // Trigger the file input click programmaticall
    console.log("a")
  }

  addCategory() {
    console.log('Category Name:', this.name);
    this.galleryApiService.createCategory(this.name)
      .then(response => {
        console.log('Category created successfully:', response);
        this.dialogRef.close({ success: true });
      })
      .catch(error => {
        console.error('Error creating category:', error);
        // Handle error, if needed
        if (error.code == 409) {
          window.alert("Zadaný názov kategórie už existuje. Zadajte iný.")
        } else {
          window.alert("Nastala chyba pri spracovaní.")
        }
      });
  }
}
