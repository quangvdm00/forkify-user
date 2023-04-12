import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  private userId = this.firebaseService.getUserId();
  public products?: Product[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadLoveProducts();
  }

  loadLoveProducts() {
    this.userService.getLoveProductsByUser(this.userId).subscribe(this.processLoveProducts())
  }

  processLoveProducts() {
    return (data: any) => {
      this.products = data.products;
    }
  }

}
