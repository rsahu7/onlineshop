package com.ecommerce.onlineshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.onlineshop.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
