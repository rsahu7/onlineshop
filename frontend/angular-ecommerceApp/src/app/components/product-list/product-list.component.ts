import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string;
  searchMode: boolean;
  previousCategoryId: number = 1;
  previousKeyword: string;

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
      this.listProducts();
    });
    
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
     // check if "id" parameter is available
     const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

     if (hasCategoryId) {
       this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
       this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
     }
     else
     {
       this.currentCategoryId = 1;
       this.currentCategoryName = "Books";
     }

     if (this.currentCategoryId != this.previousCategoryId) {
       this.pageNumber = 1;
     }
     this.previousCategoryId = this.currentCategoryId;
 
     this.productService.getProductListsPaginate(this.currentCategoryId, 
                                        this.pageNumber-1, 
                                        this.pageSize).subscribe(this.processResponse());   
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != theKeyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = theKeyword;

    this.productService.searchProductsPaginate(theKeyword, 
                                              this.pageNumber-1, 
                                              this.pageSize).subscribe(this.processResponse());
  }

  processResponse() {
    return (data:any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`${theProduct.name} - ${theProduct.unitPrice}`);
  }

}
