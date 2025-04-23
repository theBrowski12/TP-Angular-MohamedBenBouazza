import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItem } from './shopping-cart-item.component';

describe('ShoppingCartItemComponent', () => {
  let component: ShoppingCartItem;
  let fixture: ComponentFixture<ShoppingCartItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
