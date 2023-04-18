import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/shared/classes/order-dto';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  private userId = this.firebaseService.getUserId();
  public orders: OrderResponse[];

  constructor(
    private orderService: OrderService,
    private firebaseService: FirebaseService) {

  }

  ngOnInit(): void {
    this.orderService.getOrderByUser(this.userId).subscribe((data) => {
      this.orders = data.orders
    })
  }
}
