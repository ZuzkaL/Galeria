import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-add-category-image-dialog',
  templateUrl: './add-category-image-dialog.component.html',
  styleUrls: ['./add-category-image-dialog.component.less']
})
export class AddCategoryImageDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddCategoryImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private galleryApiService: GalleryApiService,
    private translate: TranslateService
  ) { }

  isChosenImageJPG = true

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
      // Check if the file type is .jpg
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.selectedImage = e.target?.result;
        };

        reader.readAsDataURL(file);
      } else {
        // Alert the user if the selected file is not a .jpg file
        this.isChosenImageJPG = false
      }
    }
  }

  addCategoryImage(): void {
    // Make sure you have a valid path for your category
    if (this.selectedImage) {
      const file = this.dataURLtoFile(this.selectedImage, 'image.png'); // Convert base64 to File
      this.galleryApiService.uploadImage(this.data?.categoryPath, file)
        .then(response => {
          console.log('Image uploaded successfully:', response);
          this.dialogRef.close({ success: true });
        })
        .catch(error => {
          console.error('Error uploading image 2:', error);
          // 400 Invalid request - file not found.
          if (error.code == 400)
            window.alert(this.translate.instant("file-not-found"))
          // 404 gallery not found
          if (error.code == 404)
            window.alert(this.translate.instant("category-not-found"))
          if(error.isTrusted && error.type=='error'){
            window.alert(this.translate.instant("photoUploadError"))
          }
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
