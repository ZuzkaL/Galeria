import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.less']
})
export class ImageOverlayComponent {

  url:string = ""
  allImages:any[] = []
  index:number;
  ngOnInit(): void {
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private galleryApiService:GalleryApiService,
    private dialogRef: MatDialogRef<ImageOverlayComponent>,
    ) {
      this.allImages = this.data.allImages
      this.index = this.data.index
      console.log(this.index)
      this.updateImageUrl();
    }

  closeOverlay() {
    this.dialogRef.close();
  }
  closeOverlayOnOutsideClick(event: MouseEvent): void {
    const overlayContent = document.querySelector('.overlay-content') as HTMLElement;
    if (!overlayContent.contains(event.target as Node)) {
      this.closeOverlay();
    }
  }
  

  moveNext() {
    if (this.index < this.allImages.length - 1) {
      this.index++;
    }else{
      this.index=0
    }
    this.updateImageUrl();
  }

  movePrevious() {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.allImages.length-1
    }
    this.updateImageUrl();
  }

  private updateImageUrl() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    this.url = this.galleryApiService.getImageUrl(vw, vh, this.allImages[this.index].fullpath);
  }

}