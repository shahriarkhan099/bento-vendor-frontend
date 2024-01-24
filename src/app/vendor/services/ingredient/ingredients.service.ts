import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private apiUrl = 'https://bento-vendor.onrender.com/v1/product/vendor';

  private ingredientMappings: Record<string, number> = {};

  constructor(private http: HttpClient) {
    this.loadIngredientMappings();
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  loadIngredients(): Observable<any[]> {
    return this.http.get<any[]>('../../../../assets/ingredients.json');
  }

  async loadIngredientMappings() {
    const ingredients = await this.loadIngredients().toPromise();
    if (ingredients) {
      ingredients.forEach((ingredient) => {
        this.ingredientMappings[ingredient.ingredientName] =
          ingredient.uniqueIngredientId;
      });
    }
  }

  getIngredientMappings(): Record<string, number> {
    return this.ingredientMappings;
  }

  getIngredients(id: number): Observable<any[]> {
    return this.http
      .get<{ data: any[] }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  addIngredient(ingredient: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/${ingredient.vendorId}`, ingredient)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  editIngredient(ingredientId: number, ingredient: any): Observable<any> {
    return this.http
      .put<void>(`${this.apiUrl}/${ingredient.vendorId}/${ingredientId}`, ingredient)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteIngredient(vendorId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${vendorId}/${productId}`);
  }
}