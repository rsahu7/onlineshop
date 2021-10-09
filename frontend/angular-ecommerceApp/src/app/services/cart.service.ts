import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
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

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    
    if (theCartItem.quantity == 0) {
      this.remove(theCartItem);
    }
    else {
      this.computerCartTotals();
    }

  }
  remove(theCartItem: CartItem) {
    
    const itemIndex = this.cartItems.findIndex(tempCartItem => theCartItem.id === tempCartItem.id);
    
    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computerCartTotals();
    }
  }


}
