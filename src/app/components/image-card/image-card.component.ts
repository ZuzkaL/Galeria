import { Component, Input, OnInit } from '@angular/core';
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

  onDelete() {
    const confirmationDialogData: ConfirmationDialogData = {
      title: 'Odstrániť obrázok?',
      description: 'Naozaj si želáte odstrániť tento obrázok?',
      confirmButtonText: 'Áno',
      cancelButtonText: 'Nie',
      onConfirm: () => {
        this.galleryApiService.deleteCategoryOrImageByPath(this.image.fullpath).then(
          () => {
              this.sharedService.triggerCategoriesReload(),
              this.isDeleted = true
          }
        )
      }
    };
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: confirmationDialogData
    });
  }
}
