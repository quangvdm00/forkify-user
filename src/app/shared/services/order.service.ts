import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PaymentInfo} from '../classes/payment-info';
import {map} from 'rxjs/operators';


const state = {
    checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
};

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private purchaseUrl = `${environment.foodOrderingBaseApiUrl}/checkout/purchase`;
    private socket;
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
        console.log(JSON.stringify(paymentInfo));
        var item = {
            shippingDetails: details,
            product: paymentInfo.items,
            orderId: paymentInfo.orderInfo.orderId,
            totalAmount: paymentInfo.orderInfo.amount
        };
        state.checkoutItems = item;
        localStorage.setItem('checkoutItems', JSON.stringify(item));
        localStorage.removeItem('cartItems');

        return this.httpClient.post<any>(this.purchaseUrl, paymentInfo);
    }

    getOrderStatusUpdates(orderId: string): Observable<string> {
        const response: Observable<string> = this.httpClient.get<GetOrderDetailResponse>(this.purchaseUrl + `/success/${orderId}`).pipe(
            map(res => res.orderStatus)
        );
        return response;
    }
}

interface GetOrderDetailResponse {
    orderId: string;
    orderStatus: string;
}
