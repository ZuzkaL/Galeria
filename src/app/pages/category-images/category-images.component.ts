import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddCategoryImageDialogComponent } from 'src/app/components/dialogs/add-category-image-dialog/add-category-image-dialog.component';
import { ImageDialogComponent } from 'src/app/components/dialogs/image-dialog/image-dialog.component';
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

  constructor(
    private route: ActivatedRoute, 
    private galleryApiService: GalleryApiService,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryPath = params['path'];
      this.loadCategoryImages();
    });
  }

  loadCategoryImages() {
    this.galleryApiService.getCategoryImages(this.categoryPath)
      .then((category) => {
        this.images = category.images
        this.gallery = category.gallery
        console.log("images",category)
        this.isLoading = false
      })
      .catch((error) => {
        console.error('Error loading category images:', error);
      });
  }

  @HostListener('window:resize', ['$event'])
  calcWidthOfContainer(){
    const vw = window.innerWidth;
    const result = (265 * Math.floor(( vw / 265)));
    return result+"px"
  }

  openAddImageDialog(){
    const dialogRef = this.dialog.open(AddCategoryImageDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result.success){
        this.loadCategoryImages()
      }
    });
  }

  openFullSizeImageDialog(fullPath: any): void {
    // TODO: pridat posuvanie
    console.log(fullPath)
    this.dialog.open(ImageDialogComponent, {
      data: { 
        path:fullPath
       },
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'full-size-image-dialog',
    });
  }
}