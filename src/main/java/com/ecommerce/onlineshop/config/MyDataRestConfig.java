package com.ecommerce.onlineshop.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.ecommerce.onlineshop.entity.Product;
import com.ecommerce.onlineshop.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
	
	EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager entityManager) {
		this.entityManager = entityManager;
	}



	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		HttpMethod[] theUnSupportedMethods = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
		
		config.getExposureConfiguration()
			.forDomainType(Product.class)
			.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedMethods))
			.withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedMethods));

		config.getExposureConfiguration()
		.forDomainType(ProductCategory.class)
		.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedMethods))
		.withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedMethods));	
		
		exposeId(config);
		//config.exposeIdsFor(Product.class, ProductCategory.class);

		
	}
	

	private void exposeId(RepositoryRestConfiguration config) {

		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		List<Class> entityClasses = new ArrayList<>();
		
		for (EntityType tempEntity : entities) {
			entityClasses.add(tempEntity.getJavaType());
		}
		
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		
		config.exposeIdsFor(domainTypes);
	}
}
