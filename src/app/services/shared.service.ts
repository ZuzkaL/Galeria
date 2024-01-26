import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private reloadCategoriesSource = new BehaviorSubject<boolean>(false);
  reloadCategories$ = this.reloadCategoriesSource.asObservable();

  triggerCategoriesReload() {
    this.reloadCategoriesSource.next(true);
  }
}
