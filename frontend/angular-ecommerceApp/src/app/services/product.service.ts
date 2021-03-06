import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products";

  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

  getProductLists(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
        map(response => response._embedded.products)
    );
  }

  getProductListsPaginate(categoryId: number, 
                          page: number,
                          pageSize: number): Observable<GetResponseProduct> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
                    + `&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProduct(productId: number): Observable<Product> {
    const searchUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
        map(response => response._embedded.products)
    );
  }

  searchProductsPaginate(theKeyword: string, 
                          page: number,
                          pageSize: number): Observable<GetResponseProduct> {

      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      + `&page=${page}&size=${pageSize}`;

      return this.httpClient.get<GetResponseProduct>(searchUrl);
}

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
  );
  }



}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    pageNumber: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
} 


