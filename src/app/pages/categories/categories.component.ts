import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AddCategoryDialogComponent } from 'src/app/components/dialogs/add-category-dialog/add-category-dialog.component';
import { GalleryApiService } from 'src/app/services/gallery-api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  shownCategories: any[] = [];
  isLoading = true
  searchValue = ""
  sortAscending = true;

  constructor(
    private galleryApiService: GalleryApiService,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.loadCategories();
    this.sharedService.reloadCategories$.subscribe(() => {
      this.loadCategories();
    });
  }


  // Loads categories from the gallery API.
  loadCategories() {
    this.galleryApiService.getCategories()
      .pipe(
        catchError((error) => {
          console.error('Error loading categories:', error);
  
          // Rethrow the error to propagate it to the next subscriber
          return throwError(error);
        }),
        finalize(() => {
          // This block will be executed whether the request is successful or fails
          this.isLoading = false;
        })
      )
      .subscribe((categories) => {
        this.categories = categories.galleries;
        this.filterCategories();
        this.shownCategories = categories.galleries;
      });
  }

  // Filters categories based on the search input.
  filterCategories() {
    this.shownCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  // Toggles the sorting order of categories.
  toggleSortOrder(isAscending: boolean) {
    this.sortAscending = isAscending;
    this.sortCategories();
  }

  // Sorts the displayed categories based on the current sorting order.
  sortCategories() {
    this.shownCategories.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return this.sortAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }

  // Handles input change in the search field.
  onInputChange() {
    this.filterCategories()
  }

  // Opens the dialog for adding a new category.
  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result?.success) {
        this.sharedService.triggerCategoriesReload();
      }
    });
  }
}
