import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize} from 'ng-zorro-antd/table';
import { formatDateToString } from '../../../utils/formatDateUtils';
import { sortByCreatedAt } from '../../../utils/sortUtils';
import { IngredientsService } from '../../services/ingredient/ingredients.service';
import { StorageService } from '../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-suppliable-ingredients',
  templateUrl: './suppliable-ingredients.component.html',
  styleUrl: './suppliable-ingredients.component.css',
})
export class SuppliableIngredientsComponent implements OnInit {
  createdIngredients: any[] = [];
  ingredientList: any[] = [];
  vendorId = Number(StorageService.getId());

  constructor(
    private ingredientService: IngredientsService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.subscribeToIngredientChanges();
    this.loadIngredientsFromAssests();
    this.loadAllIngredients(this.vendorId);
  }

  private subscribeToIngredientChanges() {
    this.ingredientService.refreshNeeded$.subscribe(() => {
      this.loadAllIngredients(this.vendorId);
    });
  }

  private loadAllIngredients(restaurantId: number) {
    this.ingredientService.getIngredients(restaurantId).subscribe({
      next: (data) => {
        this.createdIngredients = data.map((ingredient) => ({
          ...ingredient,
          expiryDate: formatDateToString(new Date(ingredient.expiryDate)),
          updatedAt: formatDateToString(new Date(ingredient.updatedAt)),
        }));

        sortByCreatedAt(this.createdIngredients);
        console.log('Ingredient data loaded', this.createdIngredients);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
        this.message.error(
          'Failed to fetch ingredient data. Please try again.'
        );
      },
    });
  }

  createUpdateIngredient() {
    let uniqueIngredientId =
      this.ingredientService.getIngredientMappings()[this.name];
    console.log('uniqueIngredientId', uniqueIngredientId);

    const newIngredient = {
      uniqueIngredientId: this.ingredientService.getIngredientMappings()[this.name],
      name: this.name,
      unitOfStock: this.unitOfStock,
      price: Number(this.price),
      minimumOrderAmount: Number(this.minimumOrderAmount),
      volumeDiscount: Number(this.volumeDiscount),
      image: this.image,
      expiryDate: this.expiryDate,
      vendorId: this.vendorId,
    };
    console.log('newIngredient', newIngredient);
    console.log(this.id);
    

    if (this.isEdit) {
      this.ingredientService.editIngredient(this.id, newIngredient).subscribe({
        next: (res) => {
          console.log(res);
          this.message.success('Ingredient Updated successfully.');
        },
        error: (error) => {
          console.error('Error updating ingredient:', error);
          this.message.error('Error updating ingredient. Please try again.');
        },
      });
    } else {
      this.ingredientService.addIngredient(newIngredient).subscribe({
        next: (res) => {
          console.log(res);
          this.message.success('Ingredient Added successfully.');
        },
        error: (error) => {
          console.error('Error adding ingredient:', error);
          this.message.error('Error adding ingredient. Please try again.');
        },
      });
    }
  }

  onDelete(id: number): void {
    this.ingredientService.deleteIngredient(this.vendorId, id).subscribe({
      next: () => {
        this.createdIngredients = this.createdIngredients.filter(
          (ingredient) => ingredient.id !== id
        );
        this.message.success('Ingredient deleted successfully.');
      },
      error: (error) => {
        console.error(`Error deleting ingredient with ID ${id}`, error);
        this.message.error('Error deleting ingredient, please try again.');
      },
    });
  }

  onEdit(ingredient: any): void {
    this.visible = true;
    this.isEdit = true;

    this.id = ingredient.id;
    this.name = ingredient.name;
    this.liquid = ingredient.liquid;
    this.unitOfStock = ingredient.unitOfStock;
    this.price = ingredient.price;
    this.minimumOrderAmount = ingredient.minimumOrderAmount;
    this.volumeDiscount = ingredient.volumeDiscount;
    this.image = ingredient.image;
    this.expiryDate = new Date(ingredient.expiryDate);
  }

  async loadIngredientsFromAssests(): Promise<void> {
    try {
      const ingredients = await this.ingredientService
        .loadIngredients()
        .toPromise();
      if (ingredients) {
        this.ingredientList = ingredients;
        console.log(this.ingredientList);
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  unitOfQuantityOptions = ['kg', 'piece', 'can', 'packet', 'litre', 'bottle'];
  booleanList = ['Yes', 'No'];

  onLiquidChange(value: string): void {
    this.liquid = value;

    if (this.liquid === 'Yes') {
      this.unitOfQuantityOptions = ['litre', 'bottle', 'can', 'packet'];
    } else if (this.liquid === 'No') {
      this.unitOfQuantityOptions = ['kg', 'piece', 'can', 'packet'];
    }
  }

  visible = false;
  isEdit = false;

  onAdd(): void {
    this.visible = true;
    this.isEdit = false;
    this.refreshFields();
  }

  close(): void {
    this.visible = false;
  }

  submitForm() {
    this.visible = false;
    this.createUpdateIngredient();
  }

  refreshFields(): void {
    this.id = '';
    this.name = '';
    this.liquid = '';
    this.unitOfStock = '';
    this.price = '';
    this.minimumOrderAmount = '';
    this.volumeDiscount = '';
    this.image = '';
    this.expiryDate = new Date();
  }

  id!: number | any;
  name!: string;
  liquid!: string;
  unitOfStock!: string;
  price!: number | any;
  minimumOrderAmount!: number | any;
  volumeDiscount!: number | any;
  image!: string;
  expiryDate: Date = new Date();

  totalNumberOfData = 0;
  pageIndex = 1;
  pageSize = 10;

  frontPagination = true;
  showPagination = true;
  paginationPosition: NzTablePaginationPosition = 'bottom';
  paginationType: NzTablePaginationType = 'small';
  showBorder = true;
  outerBordered = true;
  sizeOfTable: NzTableSize = 'small';
  loadingStatus = false;

  tableTitle = 'Current Ingredients';
  tableFooter = '';
  noResult = 'No Ingredient Present';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;

  showDeleteButton = true;
  showEditButton = true;
  showAddButton = true;

  disabledDate = (current: Date): boolean => {
    return current && current.getTime() < this.getToday().getTime();
  };

  private getToday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }
}