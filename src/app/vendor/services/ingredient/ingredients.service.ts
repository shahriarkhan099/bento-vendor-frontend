import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {

  private ingredientMappings: Record<string, number> = {};

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.loadIngredientMappings();
  }

  getVendorApiUrl(): string {
    return this.configService.getVendorApiUrl();
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
      .get<{ data: any[] }>(`${this.getVendorApiUrl()}/v1/product/vendor/${id}`)
      .pipe(map((response) => response.data));
  }

  addIngredient(ingredient: any): Observable<any> {
    return this.http
      .post(`${this.getVendorApiUrl()}/v1/product/vendor/${ingredient.vendorId}`, ingredient)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  editIngredient(ingredientId: number, ingredient: any): Observable<any> {
    return this.http
      .put<void>(`${this.getVendorApiUrl()}/v1/product/vendor/${ingredient.vendorId}/${ingredientId}`, ingredient)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteIngredient(vendorId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.getVendorApiUrl()}/v1/product/vendor/${vendorId}/${productId}`);
  }
  
}