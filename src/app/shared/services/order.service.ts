import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaymentInfo } from '../classes/payment-info';
import { map } from 'rxjs/operators';
import { ShippingResponse } from '../classes/shipping-response';
import { OrderDto } from '../classes/order-dto';


const state = {
    checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
};

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private purchaseUrl = `${environment.foodOrderingBaseApiUrl}/checkout/purchase`;
    private orderUrl = `${environment.foodOrderingBaseApiUrl}/orders`;
    private debugEnabled = false;

    constructor(private router: Router,
        private httpClient: HttpClient) {
    }

    // Get Checkout Items
    public get checkoutItems(): Observable<any> {
        const itemsStream = new Observable(observer => {
            observer.next(state.checkoutItems);
            observer.complete();
        });
        return <Observable<any>>itemsStream;
    }

    saveNewOrder(userId: number, orderDto: OrderDto) {
        return this.httpClient.post(`${environment.foodOrderingBaseApiUrl}/users/${userId}/orders`, orderDto);
    }

    // Create order
    public createOrder(product: any, details: any, orderId: any, amount: any) {
        var item = {
            shippingDetails: details,
            product: product,
            orderId: orderId,
            totalAmount: amount
        };
        state.checkoutItems = item;
        localStorage.setItem('checkoutItems', JSON.stringify(item));
        localStorage.removeItem('cartItems');
        this.router.navigate(['/shop/checkout/success', orderId]);
    }

    public createZaloPayOrder(paymentInfo: PaymentInfo, details: any): Observable<any> {
        var item = {
            shippingDetails: details,
            product: paymentInfo.items,
            orderId: paymentInfo.orderInfo.orderId,
            totalAmount: paymentInfo.orderInfo.amount
        };
        state.checkoutItems = item;
        localStorage.setItem('checkoutItems', JSON.stringify(item));
        // localStorage.removeItem('cartItems');

        return this.httpClient.post<any>(this.purchaseUrl, paymentInfo);
    }

    getOrderStatusUpdates(orderId: string): Observable<string> {
        const response: Observable<string> = this.httpClient.get<GetOrderDetailResponse>(this.purchaseUrl + `/success/${orderId}`).pipe(
            map(res => res.orderStatus)
        );
        return response;
    }

    getShippingCost(address: string, shopId: number) {
        return this.httpClient.get<ShippingResponse>(this.orderUrl + `/cost?address=${address}&shopId=${shopId}`);
    }
}

interface GetOrderDetailResponse {
    orderId: string;
    orderStatus: string;
}
