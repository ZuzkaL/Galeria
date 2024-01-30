import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.less']
})
export class ImageOverlayComponent {

  url: string = ""
  allImages: any[] = []
  index: number;
  isLoading: boolean = true;

  ngOnInit(): void {
    // Subscribe to keyboard events
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  ngOnDestroy(): void {
    // Unsubscribe from keyboard events when the component is destroyed
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  // Handle keyboard events
  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
        this.moveNext();
        break;
      case 'ArrowLeft':
        this.movePrevious();
        break;
      case 'Escape':
        this.closeOverlay();
        break;
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private galleryApiService: GalleryApiService,
    private dialogRef: MatDialogRef<ImageOverlayComponent>,
    private translate: TranslateService
  ) {
    this.allImages = this.data.allImages
    this.index = this.data.index
    this.updateImageUrl();
  }

  // Closes the image overlay dialog.
  closeOverlay() {
    this.dialogRef.close();
  }


  // Closes the image overlay dialog if a click occurs outside the overlay content.
  closeOverlayOnOutsideClick(event: MouseEvent): void {
    const overlayContent = document.getElementById('overlay-content') as HTMLElement;
    if (!overlayContent.contains(event.target as Node)) {
      this.closeOverlay();
    }
  }

  // Moves to the next image in the category.
  moveNext() {
    if (this.index < this.allImages.length - 1) {
      this.index++;
    } else {
      this.index = 0
    }
    this.updateImageUrl();
  }

  // Moves to the previous image in the category.
  movePrevious() {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.allImages.length - 1
    }
    this.updateImageUrl();
  }

  // Updates the image URL based on the current index and dimensions of the viewport.
  private updateImageUrl() {
    this.isLoading = true;

    try {
      const imageUrl = this.galleryApiService.getImageUrl(0, 0, this.allImages[this.index].fullpath);

      const img = new Image();
      img.onload = () => {
        this.isLoading = false
        this.url = imageUrl
      };
      img.onerror = () => {
        this.isLoading = false
        this.url = '../../../assets/placeholder.jpg'
        console.error('Error updating image URL:');
      };
      img.src = imageUrl;
    } catch (error: any) {
      this.url = '../../../assets/placeholder.jpg'
      this.isLoading = false
      console.error('Error updating image URL:', error);
      if (error.code === 404) {
        // Image not found
        window.alert(this.translate.instant("imageNotFound"))
      } else if (error.code === 500) {
        // Error generating image preview, handle it as needed
        window.alert(this.translate.instant("generatePreviewError"))
      }
    }
  }


}