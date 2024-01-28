import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
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
    private sharedService: SharedService
  ) { }

  getImageUrl(width: number, height: number, path: string): string {
    return this.galleryApiService.getImageUrl(width, height, path);
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
