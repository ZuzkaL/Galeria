import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.less']
})
export class ImageDialogComponent implements OnInit {


  url:string = ""
  ngOnInit(): void {
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private galleryApiService:GalleryApiService
    ) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let url = this.galleryApiService.getImageUrl(vw,vh,this.data.path)
    this.url = url
    }
}
