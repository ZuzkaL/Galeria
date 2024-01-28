import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryImagesComponent } from './pages/category-images/category-images.component';
import { CategoryCardComponent } from './components/cards/category-card/category-card.component';
import { ImageCardComponent } from './components/cards/image-card/image-card.component';
import { AddCategoryDialogComponent } from './components/dialogs/add-category-dialog/add-category-dialog.component';
import { AddCategoryImageDialogComponent } from './components/dialogs/add-category-image-dialog/add-category-image-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ImageOverlayComponent } from './components/image-overlay/image-overlay.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryImagesComponent,
    CategoryCardComponent,
    ImageCardComponent,
    AddCategoryDialogComponent,
    AddCategoryImageDialogComponent,
    ConfirmationDialogComponent,
    ImageOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
