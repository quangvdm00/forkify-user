import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent implements OnInit {
  public products: Product[] = [];
  public productCollections: any[] = [];
  public active;

  constructor(public productService: ProductService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.products.filter(item => item.categories[0] === 'Đồ nướng');
      // Get Product Collection
      this.products.filter((item) => {
        item.categories.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        });
      });
    });
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.categories.find(i => i === collection)) {
        return item
      }
    })
  }

  ngOnInit(): void {
  }

}
