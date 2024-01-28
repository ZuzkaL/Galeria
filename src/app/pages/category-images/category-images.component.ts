import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AddCategoryImageDialogComponent } from 'src/app/components/dialogs/add-category-image-dialog/add-category-image-dialog.component';
import { ConfirmationDialogData, ConfirmationDialogComponent } from 'src/app/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ImageOverlayComponent } from 'src/app/components/image-overlay/image-overlay.component';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-category-images',
  templateUrl: './category-images.component.html',
  styleUrls: ['./category-images.component.less']
})
export class CategoryImagesComponent implements OnInit {
  categoryPath: string = '';
  images: any[] = [];
  gallery: any = null;
  isLoading = true;
  doesThisCategoryExist = true

  constructor(
    private route: ActivatedRoute,
    private galleryApiService: GalleryApiService,
    public dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryPath = params['path'];
      this.loadCategoryImages();
    });
  }

  //  Loads images for the selected category.
  loadCategoryImages() {
    this.galleryApiService.getCategoryImages(this.categoryPath)
      .then((category) => {
        this.images = category.images
        this.gallery = category.gallery
        console.log("images", category)
        this.isLoading = false
      })
      .catch((error) => {
        console.error('Error loading category images:', error);
        if (error.code == 404) {
          this.doesThisCategoryExist = false
        }
      });
  }

  // Opens the dialog for adding a new image to the category.
  openAddImageDialog() {
    const dialogRef = this.dialog.open(AddCategoryImageDialogComponent, {
      data: {
        categoryPath: this.gallery.path,
        categoryName: this.gallery.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result?.success) {
        this.loadCategoryImages()
      }
    });
  }

  // Opens a dialog displaying a full-size image.
  openFullSizeImageDialog(index: number): void {
    this.dialog.open(ImageOverlayComponent, {
      data: {
        index: index,
        allImages: this.images
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'full-size-image-dialog',
    });
  }

  // Handles the deletion of an image.
  onDeleteImage(index: number) {
    const confirmationDialogData: ConfirmationDialogData = {
      title: this.translate.instant("delete-image-title"),
      description: this.translate.instant("delete-image-description"),
      confirmButtonText: this.translate.instant("yes"),
      cancelButtonText: this.translate.instant("no"),
      onConfirm: () => {
        this.galleryApiService.deleteCategoryOrImageByPath(this.images[index].fullpath)
          .then(
            () => {
              this.loadCategoryImages()
            }
          ).catch((error) => {
            if (error.code === 404) {
              // Handle 404 error (category does not exist)
              alert(this.translate.instant("image-not-found"));
            } else {
              // Handle other errors
              console.error('Error deleting image:', error);
              alert(this.translate.instant("delete-image-error"));
            }
          });
      }
    };
    this.dialog.open(ConfirmationDialogComponent, {
      data: confirmationDialogData
    });
  }
}