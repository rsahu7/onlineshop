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

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;
      alreadyexistInCart = (existingCartItem != undefined);      
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

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempCartItem of this.cartItems) {
      totalPriceValue += tempCartItem.quantity * tempCartItem.unitPrice;
      totalQuantityValue += tempCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log("Contents of the cart...")
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name = ${tempCartItem.name}, quantity = ${tempCartItem.quantity}, subTotal = ${subTotalPrice}`);
    }
    console.log('--------------');
    console.log(`Total Quantity : ${totalQuantityValue}, Total Price : ${totalPriceValue}`);
    console.log('--------------');
  }


}
