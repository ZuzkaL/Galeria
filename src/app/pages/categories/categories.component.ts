import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryDialogComponent } from 'src/app/components/dialogs/add-category-dialog/add-category-dialog.component';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  isLoading = true

  constructor(
    private galleryApiService: GalleryApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.galleryApiService.getCategories()
      .then((categories) => {
        this.categories = categories.galleries;
        console.log("category", categories)
        this.isLoading=false
      })
      .catch((error) => {
        console.error('Error loading categories:', error);
        // TODO: Môžeš spracovať chybu a informovať používateľa
      });
  }

  @HostListener('window:resize', ['$event'])
  calcWidthOfContainer(){
    const vw = window.innerWidth;
    const result = (260 * Math.floor(( vw / 260)));
    return result+"px"
  }

  openAddCategoryDialog(){
    const dialogRef = this.dialog.open(AddCategoryDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result.success){
        this.loadCategories()
      }
    });
  }
}
