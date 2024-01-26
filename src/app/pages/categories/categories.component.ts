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
  shownCategories : any[] = [];
  isLoading = true
  searchValue = ""
  sortAscending = true;

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
        this.filterCategories();
        this.isLoading=false
        this.shownCategories = categories.galleries
      })
      .catch((error) => {
        console.error('Error loading categories:', error);
        // TODO: Môžeš spracovať chybu a informovať používateľa
      });
  }
  filterCategories() {
    this.shownCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  toggleSortOrder(isAscending:boolean) {
    this.sortAscending = isAscending;
    this.sortCategories();
  }

  sortCategories() {
    this.shownCategories.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return this.sortAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }

  onInputChange(){
    console.log("a",this.searchValue)
    this.filterCategories()
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
