package com.ecommerce.onlineshop.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.onlineshop.dao.CustomerRepository;
import com.ecommerce.onlineshop.dto.Purchase;
import com.ecommerce.onlineshop.dto.PurchaseResponse;
import com.ecommerce.onlineshop.entity.Customer;
import com.ecommerce.onlineshop.entity.Order;
import com.ecommerce.onlineshop.entity.OrderItem;

@Service
public class CheckoutServiceImpl implements CheckoutService {

	private CustomerRepository customerRepository;
	
	@Autowired
	public CheckoutServiceImpl(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
	
	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {

		String orderTrackingNumber = null;
		System.out.println(">>>>>>>>>>>>>> Insixe Checkout Service Impl " + purchase.getOrder().getTotalQuantity());
		try {
		Order order = purchase.getOrder();
		
		orderTrackingNumber = getOrderTrackingNumber();
		order.setOrderTrackingNumber(orderTrackingNumber);
		
		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(item -> order.add(item));
		
		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());
		
		Customer customer = purchase.getCustomer();
		customer.add(order);	
		
		customerRepository.save(customer);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		return new PurchaseResponse(orderTrackingNumber);
	}

	private String getOrderTrackingNumber() {

		return UUID.randomUUID().toString();
	}

}
