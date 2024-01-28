import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.less']
})
export class ImageCardComponent implements OnInit {
  @Input() image: any;
  @Output() cardClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();
  showDeleteButton = false;
  isDeleted = false;
  imageUrl = '';

  constructor(
    private galleryApiService: GalleryApiService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.imageUrl = this.getImageUrl(this.image?.fullpath);
  }


  // Get the image URL using the width, height, and path.
  getImageUrl(path: string): string {
    const imageContainer = this.el.nativeElement.querySelector('#image-container');

    // Check if the element is found
    if (imageContainer) {
      const width = imageContainer.clientWidth;
      const height = imageContainer.clientHeight;

      return this.galleryApiService.getImageUrl(width, height, path);
    } else {
      return ''; // or return a default URL or handle it as needed
    }
  }


  // Emit event to open overlay when the card is clicked.
  openOverlay() {
    this.cardClicked.emit();
  }


  // Emit event to delete the image when the delete button is clicked.
  onDelete(event: Event) {
    // Stop event propagation to prevent opening the overlay
    event.stopPropagation();
    this.deleteClicked.emit();
  }
}
