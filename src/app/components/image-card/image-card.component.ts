import { Component, Input, OnInit } from '@angular/core';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.less']
})
export class ImageCardComponent {
  @Input() image: any;
  constructor(private galleryApiService: GalleryApiService) { }

  getImageUrl(width: number, height: number, path: string): string {
    return this.galleryApiService.getImageUrl(width, height, path);
  }

}
