package com.ecommerce.onlineshop.service;

import com.ecommerce.onlineshop.dto.Purchase;
import com.ecommerce.onlineshop.dto.PurchaseResponse;

public interface CheckoutService {
	
	PurchaseResponse placeOrder(Purchase purchase);

}
