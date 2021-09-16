package com.ecommerce.onlineshop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.ecommerce.onlineshop.entity.Product;
import com.ecommerce.onlineshop.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		HttpMethod[] theUnSupportedMethods = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
		
		config.getExposureConfiguration()
			.forDomainType(Product.class)
			.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedMethods))
			.withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedMethods));

		config.getExposureConfiguration()
		.forDomainType(ProductCategory.class)
		.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedMethods))
		.withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedMethods));		
	}
}
