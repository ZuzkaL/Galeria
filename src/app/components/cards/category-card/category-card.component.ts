import { Component,  Input, OnInit } from '@angular/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';

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
  isImageLoading = true
  imageUrl=""

  constructor(
    private galleryApiService: GalleryApiService,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.loadCategoryImages();
    this.getImageUrl(this.category.image?.fullpath)
  }

  
 

  getImageUrl(path: string) {
    console.log("aaaa")
  
    try {
        console.log("aa")
        
        const url = this.galleryApiService.getImageUrl(304, 228, path);
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
  
  // Load category images and update relevant properties.
  loadCategoryImages() {
    this.galleryApiService.getCategoryImages(this.category.path)
      .pipe(
        catchError((error) => {
          if (error.code === 404) {
            this.isLoadedRight = false;
          }
          // Rethrow the error to propagate it to the next subscriber
          return throwError(error);
        }),
        finalize(() => {
          // This block will be executed whether the request is successful or fails
          this.isLoaded = true;
        })
      )
      .subscribe((category:any) => {
        this.numberOfImages = category.images.length;
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
        .pipe(
          switchMap(() => {
            this.sharedService.triggerCategoriesReload();
            return EMPTY; // Return an empty observable to fulfill the pipe
          }),
          catchError((error) => {
            if (error.code === 404) {
              alert(this.translate.instant('category-not-found'));
            } else {
              console.error('Error deleting category:', error);
              alert(this.translate.instant('delete-category-error'));
            }
            return EMPTY; // Return an empty observable to fulfill the pipe
          })
        )
        .subscribe();
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
