import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.less']
})
export class ImageCardComponent {
  @Input() image: any;
  @Output() cardClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();
  showDeleteButton = false;
  isDeleted = false;
  constructor(
    private galleryApiService: GalleryApiService,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private el: ElementRef
  ) { }

  getImageUrl(path: string): string {
    // Get the element with the ID 'image-container'
    const imageContainer = this.el.nativeElement.querySelector('#image-container');

    // Check if the element is found
    if (imageContainer) {
      // Get the width and height of the element
      const width = imageContainer.clientWidth;
      const height = imageContainer.clientHeight;

      // Call the galleryApiService method with the obtained width, height, and path
      return this.galleryApiService.getImageUrl(width, height, path);
    } else {
      // Handle the case where the element is not found
      console.error('Element with ID "image-container" not found.');
      return ''; // or return a default URL or handle it as needed
    }
  }

  openOverlay() {
    this.cardClicked.emit();
  }

  onDelete(event: Event) {
    // Stop event propagation to prevent opening the overlay
    event.stopPropagation();
    this.deleteClicked.emit();
  }
}
