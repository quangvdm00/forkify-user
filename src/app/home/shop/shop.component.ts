import {Component, OnInit} from '@angular/core';
import {ProductSlider} from '../../shared/data/slider';
import {Product} from '../../shared/classes/product';
import {ProductService} from '../../shared/services/product.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

    public products: Product[] = [];
    public ProductSliderConfig: any = ProductSlider;

    constructor(public productService: ProductService) {
        this.productService.getProducts.subscribe(response =>
            // this.products = response.products.filter(item => item.categories[0] === 'Đồ nướng')
            this.products = response.products
        );
    }

    // Sliders
    public sliders = [{
        title: 'save 10%',
        subTitle: 'fresh vegetables',
        image: 'assets/images/slider/7.jpg'
    }, {
        title: 'save 10%',
        subTitle: 'fresh vegetables',
        image: 'assets/images/slider/8.jpg'
    }];

    // Blogs
    public blogs = [{
        image: 'assets/images/blog/6.jpg',
        date: '25 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }, {
        image: 'assets/images/blog/7.jpg',
        date: '26 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }, {
        image: 'assets/images/blog/8.jpg',
        date: '27 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }, {
        image: 'assets/images/blog/9.jpg',
        date: '28 January 2018',
        title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
        by: 'John Dio'
    }]

    ngOnInit(): void {
    }

}
