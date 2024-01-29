import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GalleryApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get categories with Observable
  getCategories(): Observable<any> {
    const url = `${this.apiUrl}/gallery`;

    return this.http.get(url)
      .pipe(
        catchError(this.handleError) // Handle errors with catchError
      );
  }

  // Create category with Observable
  createCategory(categoryName: string): Observable<any> {
    const url = `${this.apiUrl}/gallery`;

    const body = {
      name: categoryName,
    };

    return this.http.post(url, body)
      .pipe(
        catchError(this.handleError) // Handle errors with catchError
      );
  }

  // Get category images with Observable
  getCategoryImages(path: string): Observable<any> {
    const url = `${this.apiUrl}/gallery/${path}`;

    return this.http.get(url)
      .pipe(
        catchError(this.handleError) // Handle errors with catchError
      );
  }

  // Delete category or image by path with Observable
  deleteCategoryOrImageByPath(path: string): Observable<any> {
    const url = `${this.apiUrl}/gallery/${path}`;

    return this.http.delete(url)
      .pipe(
        catchError(this.handleError) // Handle errors with catchError
      );
  }

  // Upload image with Observable
  uploadImage(path: string, file: File): Observable<any> {
    const url = `${this.apiUrl}/gallery/${path}`;
    const formData = new FormData();
    formData.append('image', file);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    return this.http.post(url, formData, { headers })
      .pipe(
        catchError(this.handleError) // Handle errors with catchError
      );
  }

  // Get image URL with specific width, height, and path
  getImageUrl(width: number, height: number, path: string): string {
    return `${this.apiUrl}/images/${width}x${height}/${path}`;
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 500) {
      console.error('Internal Server Error');
      window.alert('Nastala chyba pri spracovaní. Skúste to neskôr.');
    } else {
      console.error('An error occurred:', error.error.message || error.statusText);
    }
    return throwError(error.error || 'Server error'); // Use throwError to propagate the error
  }
}
