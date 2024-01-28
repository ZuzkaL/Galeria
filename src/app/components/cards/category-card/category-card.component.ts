import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.less']
})
export class CategoryCardComponent implements OnInit {
  @Input() category: any;
  numberOfImages = null;
  showDeleteButton = false;
  isLoadedRight = true;
  isLoaded = false;

  constructor(
    private galleryApiService: GalleryApiService,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private el: ElementRef,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.loadCategoryImages();
  }

  /**
   * Get the image URL using the width, height, and path.
   */
  getImageUrl(path: string): string {
    const imageContainer = this.el.nativeElement.querySelector('#image-container');

    if (imageContainer) {
      const width = imageContainer.clientWidth;
      const height = imageContainer.clientHeight;
      return this.galleryApiService.getImageUrl(width, height, path);
    } else {
      console.error('Element with ID "image-container" not found.');
      return '';
    }
  }

  /**
   * Load category images and update relevant properties.
   */
  loadCategoryImages() {
    this.galleryApiService.getCategoryImages(this.category.path)
      .then((category) => {
        this.numberOfImages = category.images.length;
        this.isLoaded = true;
      })
      .catch((error) => {
        if (error.code === 404) {
          this.isLoadedRight = false;
          this.isLoaded = true;
        }
      });
  }


  // Translate the number of images into a string based on count.
  getString() {
    let number = this.numberOfImages;
    if (!number && number !== 0) {
      return '';
    }

    if (number === 1) {
      return this.translate.instant('1photo');
    } else if (number > 1 && number < 5) {
      return this.translate.instant('2-4photo');
    } else {
      return this.translate.instant('photos');
    }
  }


  // Handle category deletion with a confirmation dialog.
  onDelete() {
    const confirmationDialogData: ConfirmationDialogData = {
      title: this.translate.instant('delete-category-title') + ' "' + this.category.name + '"?',
      description: this.translate.instant('delete-category-description') + ' "' + this.category.name + '"?',
      confirmButtonText: this.translate.instant('yes'),
      cancelButtonText: this.translate.instant('no'),
      onConfirm: () => {
        this.galleryApiService.deleteCategoryOrImageByPath(this.category.path)
          .then(() => {
            this.sharedService.triggerCategoriesReload();
          })
          .catch((error) => {
            if (error.code === 404) {
              alert(this.translate.instant('category-not-found'));
            } else {
              console.error('Error deleting category:', error);
              alert(this.translate.instant('delete-category-error'));
            }
          });
      }
    };

    this.dialog.open(ConfirmationDialogComponent, {
      data: confirmationDialogData
    });
  }


  // Truncate the category name if it exceeds the maximum character limit.
  getCategoryName() {
    const maxCharacters = 24;
    const categoryName = this.category.name;

    if (categoryName.length > maxCharacters) {
      return categoryName.substring(0, maxCharacters) + '...';
    } else {
      return categoryName;
    }
  }
}
