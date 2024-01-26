import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-add-category-image-dialog',
  templateUrl: './add-category-image-dialog.component.html',
  styleUrls: ['./add-category-image-dialog.component.less']
})
export class AddCategoryImageDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddCategoryImageDialogComponent>, 
    private galleryApiService: GalleryApiService
  ) { }

  ngOnInit(): void {
  }

  selectedImage: any = null;

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.handleImage(file);
  }

  handleDrop(event: any): void {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.handleImage(file);
  }

  handleDragOver(event: any): void {
    event.preventDefault();
  }

  private handleImage(file: File): void {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.selectedImage = e.target?.result;
      };

      reader.readAsDataURL(file);
    }
  }

  addCategoryImage(): void {
    // Make sure you have a valid path for your category
    if (this.selectedImage) {
      const file = this.dataURLtoFile(this.selectedImage, 'image.png'); // Convert base64 to File
      this.galleryApiService.uploadImage(file.name, file)
        .then(response => {
          console.log('Image uploaded successfully:', response);
          this.dialogRef.close({ success: true });
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          // TODO: Handle error, if needed
        });
    }
  }

  // Utility function to convert base64 to File
  private dataURLtoFile(dataURL: string, fileName: string): File {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  }

}
