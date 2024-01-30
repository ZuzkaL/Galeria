import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  isImageLoading=true

  constructor(
    private galleryApiService: GalleryApiService,
    private el: ElementRef,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getImageUrl(this.image?.fullpath);
    });
  }


  getImageUrl(path: string) {
    const imageContainer = this.el.nativeElement.querySelector('#image-container');
  
    try {
      if (imageContainer) {
        const width = imageContainer.clientWidth;
        const height = imageContainer.clientHeight;
        
        const url = this.galleryApiService.getImageUrl(width, height, path);
        const img = new Image();
        img.onload = () => {
          this.isImageLoading = false
          this.imageUrl = url
        };
        img.onerror = () => {
          this.isImageLoading = false
          this.imageUrl = '../../../assets/placeholder.jpg'
          console.error('Error updating image URL:');
        };
        img.src = url;
      } else {
        this.imageUrl =  '../../../assets/placeholder.jpg';
      }
    } catch (error:any) {
      console.error('Error updating image URL b:', error);
  
      // Handle different error cases
      if (error.code === 404) {
        // Image not found
        window.alert(this.translate.instant("imageNotFound"))
      } else if (error.code === 500) {
        // Error generating image preview, handle it as needed
        window.alert(this.translate.instant("generatePreviewError"))
      } 
        this.imageUrl =  '../../../assets/placeholder.jpg';
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
