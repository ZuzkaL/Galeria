import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
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
  isLoadedRight = true

  constructor(
    private galleryApiService: GalleryApiService, 
    private dialog: MatDialog,
    private sharedService: SharedService,
    private el: ElementRef
    ) {
  }

  ngOnInit(): void {
    this.loadCategoryImages()
  }
  
  getImageUrl(path: string): string {
    // Get the element with the ID 'image-container'
    const imageContainer = this.el.nativeElement.querySelector('#image-container');

    // Check if the element is found
    if (imageContainer) {
      // Get the width and height of the element
      const width = imageContainer.clientWidth;
      const height = imageContainer.clientHeight;

      // Call the galleryApiService method with the obtained width, height, and path
      return this.galleryApiService.getImageUrl(width, height, path);
    } else {
      // Handle the case where the element is not found
      console.error('Element with ID "image-container" not found.');
      return ''; // or return a default URL or handle it as needed
    }
  }

  loadCategoryImages() {
    this.galleryApiService.getCategoryImages(this.category.path)
      .then((category) => {
        this.numberOfImages = category.images.length
        console.log(this.numberOfImages)
      })
      .catch((error) => {
        if(error.code==404){
          this.isLoadedRight = false
        }
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


  onDelete() {
    const confirmationDialogData: ConfirmationDialogData = {
      title: 'Odstrániť kategóriu "' + this.category.name + '"?',
      description: 'Naozaj si želáte odstrániť kategóriu "' + this.category.name + '"?',
      confirmButtonText: 'Áno',
      cancelButtonText: 'Nie',
      onConfirm: () => {
        this.galleryApiService.deleteCategoryOrImageByPath(this.category.path)
          .then(() => {
            this.sharedService.triggerCategoriesReload();
          })
          .catch((error) => {
            if (error.code === 404) {
              // Handle 404 error (category does not exist)
              alert('Kategória neexistuje');
            } else {
              // Handle other errors
              console.error('Error deleting category:', error);
              alert('Pri vymazaní kategórie sa vyskytla chyba.');
            }
          });
      }
    };
  
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: confirmationDialogData
    });
  }
  

  getCategoryName(){
    const maxCharacters = 24; 
    const categoryName = this.category.name;

    if (categoryName.length > maxCharacters) {
      return categoryName.substring(0, maxCharacters) + '...';
    } else {
      return categoryName;
    }
  }
}
