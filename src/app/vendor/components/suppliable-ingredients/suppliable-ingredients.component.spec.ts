import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliableIngredientsComponent } from './suppliable-ingredients.component';

describe('SuppliableIngredientsComponent', () => {
  let component: SuppliableIngredientsComponent;
  let fixture: ComponentFixture<SuppliableIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliableIngredientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppliableIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
