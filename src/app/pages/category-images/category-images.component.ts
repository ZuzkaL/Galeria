import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddCategoryImageDialogComponent } from 'src/app/components/dialogs/add-category-image-dialog/add-category-image-dialog.component';
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

  openAddImageDialog(){
    const dialogRef = this.dialog.open(AddCategoryImageDialogComponent, {
      data: {
        categoryPath: this.gallery.path,
        categoryName: this.gallery.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result.success){
        this.loadCategoryImages()
      }
    });
  }
}