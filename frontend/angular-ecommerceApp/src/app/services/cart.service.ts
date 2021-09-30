import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(theCartItem: CartItem) {
    let alreadyexistInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {

        if (tempCartItem.id == theCartItem.id) {
          existingCartItem = tempCartItem;
          alreadyexistInCart = true;
          break;
        }
      }
    }

    if (alreadyexistInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(theCartItem);
    }

    this.computerCartTotals();

  } 

  
  computerCartTotals() {
    throw new Error('Method not implemented.');
  }
}
