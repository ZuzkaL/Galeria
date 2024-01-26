// gallery-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GalleryApiService {
  private apiUrl = 'https://api.programator.sk'; 
  

  constructor(private http: HttpClient) {}

  // Metóda pre získanie kategórií
  getCategories(): Promise<any> {
    const url = `${this.apiUrl}/gallery`;

    return this.http.get(url)
      .toPromise()
      .then((response: any) => response)
      .catch(this.handleError);
  }

  // Metóda pre získanie obrázkov kategórie
  getCategoryImages(path: string): Promise<any> {
    const url = `${this.apiUrl}/gallery/${path}`;

    return this.http.get(url)
      .toPromise()
      .then((response: any) => response)
      .catch(this.handleError);
  }

  // Funkcia na ošetrenie chýb
  private handleError(error: HttpErrorResponse): Promise<any> {
    if (error.status === 500) {
      console.error('Internal Server Error');
      // Môžeš vykonať ďalšie kroky v prípade chyby 500
    } else {
      console.error('An error occurred:', error.error.message || error.statusText);
    }
    return Promise.reject(error.error || 'Server error');
  }

  getImageUrl(width:number,height:number,path:string){
    return this.apiUrl+"/images/"+width+"x"+height+"/"+path;
  }

  createCategory(categoryName: string): Promise<any> {
    const url = `${this.apiUrl}/gallery`;

    const body = {
      name: categoryName,
    };

    return this.http.post(url, body)
      .toPromise()
      .then((response: any) => response)
      .catch(this.handleError);
  }

  uploadImage(path: string, file: File): Promise<any> {
    const url = `${this.apiUrl}/gallery/${path}`;
    
    const formData = new FormData();
    formData.append('image', file, file.name);

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Origin'
    });

    return this.http.post(url, formData, { headers })
      .toPromise()
      .then((response: any) => response)
      .catch(this.handleError);
  }

  deleteCategoryOrImageByPath(path: string): Promise<any> {
    const url = `${this.apiUrl}/gallery/${path}`;

    return this.http.delete(url)
      .toPromise()
      .then((response: any) => response)
      .catch(this.handleError);
  }

}
