import { Component, Input, OnInit } from '@angular/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.less']
})
export class CategoryCardComponent implements OnInit{
  @Input() category: any;
  numberOfImages=null;
  showDeleteButton = false;
  private categoriesComponentInstance: CategoriesComponent | null = null;


  constructor(private galleryApiService: GalleryApiService, private dialog: MatDialog,private sharedService: SharedService) {
  }


  ngOnInit(): void {
    this.loadCategoryImages()
  }
  
  // Helper function to construct the image URL
  getImageUrl(width: number, height: number, path: string): string {
    return this.galleryApiService.getImageUrl(width, height, path);
  }

  loadCategoryImages() {
    this.galleryApiService.getCategoryImages(this.category.path)
      .then((category) => {
        this.numberOfImages = category.images.length
        console.log(this.numberOfImages)
      })
      .catch((error) => {
        console.error('Error loading category images:', error);
      });
  }

  getString(){
    let number = this.numberOfImages
    if(!number && number!=0)
      return ""
    if (number == 1 ) {
      return "fotka"
    } else {
      if (number>1 && number<5) {
        return "fotky"
      } else {
        return "fotiek"
      }
    }
  }


  onDelete(){
    const confirmationDialogData: ConfirmationDialogData = {
      title: 'Odstrániť kategóriu "'+this.category.name+'"?',
      description: 'Naozaj si želáte odstrániť kategóriu "'+this.category.name+'"?',
      confirmButtonText: 'Áno',
      cancelButtonText: 'Nie',
      onConfirm: () => {
        this.galleryApiService.deleteCategoryOrImageByPath(this.category.path).then(
          (a)=>this.sharedService.triggerCategoriesReload()
        )
      }
    };
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: confirmationDialogData
    });
  }
}
