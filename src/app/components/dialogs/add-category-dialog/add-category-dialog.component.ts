import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GalleryApiService } from 'src/app/services/gallery-api.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.less']
})
export class AddCategoryDialogComponent {
  name: string = "";
  doesCategoryWithThisNameExist = false

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private galleryApiService: GalleryApiService,
    private tranlsate: TranslateService
  ) { }


  // Add a new category.
  // Closes the dialog if successful or handles errors. 
  addCategory() {
    this.galleryApiService.createCategory(this.name)
      .pipe(
        catchError((error) => {
          console.error('Error creating category:', error);
          
          // Handle error, if needed
          if (error.code == 409) {
            this.doesCategoryWithThisNameExist = true;
          } else {
            if (error.code == 400) {
              window.alert(this.tranlsate.instant("image-does-not-meet-requirements"));
            }
          }
  
          // Rethrow the error to propagate it to the next subscriber
          return throwError(error);
        })
      )
      .subscribe(response => {
        console.log('Category created successfully:', response);
        this.dialogRef.close({ success: true });
      });
  }
}
