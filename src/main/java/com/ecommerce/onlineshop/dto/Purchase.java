package com.ecommerce.onlineshop.dto;

import com.ecommerce.onlineshop.entity.Address;
import com.ecommerce.onlineshop.entity.Customer;
import com.ecommerce.onlineshop.entity.Order;
import com.ecommerce.onlineshop.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
