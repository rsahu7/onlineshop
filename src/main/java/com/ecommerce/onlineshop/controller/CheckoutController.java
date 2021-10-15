package com.ecommerce.onlineshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.onlineshop.dto.Purchase;
import com.ecommerce.onlineshop.dto.PurchaseResponse;
import com.ecommerce.onlineshop.service.CheckoutService;

@RestController
@CrossOrigin //("http://localhost:4200")
@RequestMapping("/api/checkout")
public class CheckoutController {
	
	private CheckoutService checkoutService;

	public CheckoutController(CheckoutService checkoutService) {
		this.checkoutService = checkoutService;
	}
	
	@PostMapping("/purchase")
	public PurchaseResponse placeOrder(@RequestBody Purchase purchase)
	{
		PurchaseResponse purchaseResponse = null;
		try {
		System.out.println(">>>>>>>>>>> Inside Controller >>>>>>>>>>>>");
		purchaseResponse = checkoutService.placeOrder(purchase);
		System.out.println(">>>>>>>>>>> Completed Controller >>>>>>>>>>>>");
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			
		}
		return purchaseResponse;
	}
	
	

}
