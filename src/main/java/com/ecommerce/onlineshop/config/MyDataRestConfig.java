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

import com.ecommerce.onlineshop.entity.Country;
import com.ecommerce.onlineshop.entity.Product;
import com.ecommerce.onlineshop.entity.ProductCategory;
import com.ecommerce.onlineshop.entity.State;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
	
	EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager entityManager) {
		this.entityManager = entityManager;
	}



	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		HttpMethod[] theUnSupportedMethods = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
		
		disableHttpMethods(Product.class, config, theUnSupportedMethods);
		disableHttpMethods(ProductCategory.class, config, theUnSupportedMethods);
		disableHttpMethods(Country.class, config, theUnSupportedMethods);
		disableHttpMethods(State.class, config, theUnSupportedMethods);
	
		exposeId(config);
		//config.exposeIdsFor(Product.class, ProductCategory.class);

		
	}

	private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnSupportedMethods) {
		
		config.getExposureConfiguration()
			.forDomainType(Product.class)
			.withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedMethods))
			.withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedMethods));
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
