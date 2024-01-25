import { Component, Input, OnInit } from '@angular/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.less']
})
export class CategoryCardComponent implements OnInit{
  @Input() category: any;
  numberOfImages=null;

  constructor(private galleryApiService: GalleryApiService) {
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
}
