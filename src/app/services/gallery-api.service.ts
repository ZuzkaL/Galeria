// gallery-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GalleryApiService {
  private apiUrl = 'http://api.programator.sk'; 
  

  constructor(private http: HttpClient) {}

  getCategories(): Promise<any> {
    // 200 ok
    // 500 unknown error
    const url = `${this.apiUrl}/gallery`;

    return this.http.get(url)
      .toPromise()
      .then((response: any) => response)
      .catch(this.handleError);
  }

  createCategory(categoryName: string): Promise<any> {
    // 201 gallery was created
    // 400 Invalid request. The request doesn't conform to the schema.
    // 409 Gallery with this name already exists
    // 500 unknown error
    const url = `${this.apiUrl}/gallery`;

    const body = {
      name: categoryName,
    };

    return this.http.post(url, body)
      .toPromise()
      .then((response: any) => response)
      .catch(this.handleError);
  }

  getCategoryImages(path: string): Promise<any> {
    // 200 ok
    // 404 gallery doesnt exist
    // 500 unknown error
    const url = `${this.apiUrl}/gallery/${path}`;

    return this.http.get(url)
      .toPromise()
      .then((response: any) => response)
      .catch(this.handleError);
  }

  deleteCategoryOrImageByPath(path: string): Promise<any> {
    // 200 Gallery/photo was deleted
    // 404 Gallery/photo does not exists
    // 500 unknown error
    const url = `${this.apiUrl}/gallery/${path}`;

    return this.http.delete(url)
      .toPromise()
      .then((response: any) => response)
      .catch(this.handleError);
  }

  uploadImage(path: string, file: File): Promise<any> {
    // 201 ok
    // 400 Invalid request - file not found.
    // 404 gallery not found
    // 500 unknown error
    const url = `${this.apiUrl}/gallery/${path}`;
    const formData = new FormData();
    formData.append('image', file);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    return this.http.post(url, formData, { headers })
      .toPromise()
      .then((response: any) => response)
      .catch(this.handleError);
  }

  getImageUrl(width:number,height:number,path:string){
    // 200 - return image preview
    // 404 photo not found
    // 500 The photo preview can't be generated.
    return this.apiUrl+"/images/"+width+"x"+height+"/"+path;
  }

  private handleError(error: HttpErrorResponse): Promise<any> {
    if (error.status === 500) {
      console.error('Internal Server Error');
      window.alert("Nastala chyba pri spracovaní. Skúste to neskôr.")
    } else {
      console.error('An error occurred:', error.error.message || error.statusText);
    }
    return Promise.reject(error.error || 'Server error');
  }
}
