import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
// import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { OrderInfo } from "../../shared/classes/OrderInfo";
import { PaymentInfo } from "../../shared/classes/payment-info";
import { ProductDto } from "../../shared/classes/product-dto";
import { Router } from "@angular/router";
import { randomUUID } from "crypto";
import { Address } from 'src/app/shared/classes/address';
import { UserService } from 'src/app/shared/services/user.service';
import { ShippingResponse } from 'src/app/shared/classes/shipping-response';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    private userId = Number(localStorage.getItem('user-id'))

    addresses: Address[] = [];
    isAddress: boolean = false;
    userName: string = '';
    shippingResponse: ShippingResponse;
    isShipping: boolean = false;
    total: number;

    public checkoutForm: UntypedFormGroup;
    public products: Product[] = [];
    public payment: string = 'ZaloPay';
    public amount: any;
    public paymentUrl: string;
    isGenerated = false;

    constructor(private fb: UntypedFormBuilder,
        public productService: ProductService,
        private orderService: OrderService,
        private userService: UserService,
        private router: Router
    ) {
        this.checkoutForm = this.fb.group({
            // firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
            // lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
            // phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
            // email: ['', [Validators.required, Validators.email]],
            // address: ['', [Validators.required, Validators.maxLength(50)]],
            address: ['', Validators.required],
            // town: ['', Validators.required],
            // state: ['', Validators.required],
            // postalcode: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.userService.getUserById(this.userId).subscribe((response) => {
            this.userName = response.fullName
        })
        this.userService.getAddressesByUser(this.userId).subscribe((response) => {
            this.addresses = response.addresses;
        })
        this.productService.cartItems.subscribe(response => this.products = response);
        this.getTotal.subscribe(amount => this.amount = amount);
        this.initConfig();
    }

    public get getSubTotal(): Observable<number> {
        return this.productService.cartTotalAmount();
    }

    public get getTotal(): Observable<number> {
        if (this.isAddress && this.shippingResponse?.cost > 0) {
            return this.productService.cartTotalAmount().pipe(map(num => num + this.shippingResponse?.cost));
        }
        else {
            return this.productService.cartTotalAmount();
        }
    }

    // Stripe Payment Gateway
    // stripeCheckout() {
    //     var handler = (<any>window).StripeCheckout.configure({
    //         key: environment.stripe_token, // publishble key
    //         locale: 'auto',
    //         token: (token: any) => {
    //             this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
    //         }
    //     });
    //     handler.open({
    //         name: 'Shopify',
    //         description: 'Online Shopping Food Store',
    //         amount: this.amount * 100
    //     });
    // }

    zaloPayCheckout(): void {
        const productsDto: ProductDto[] = [];
        const orderTrackingNumber = crypto.randomUUID();
        for (let i = 0; i < this.products.length; i++) {
            const prodDto = new ProductDto(this.products[i].name, this.products[i].cost.toString(), this.products[i].quantity.toString());
            productsDto[i] = prodDto;
        }

        this.getTotal.subscribe(result => {
            const orderInfo: OrderInfo = new OrderInfo(this.checkoutForm.get('address').value, result.toString(), orderTrackingNumber);
            const paymentInfo: PaymentInfo = new PaymentInfo(productsDto, orderInfo);
            this.orderService.createZaloPayOrder(paymentInfo, this.checkoutForm.value).subscribe({
                next: data => {
                    this.paymentUrl = data.paymentOrderUrl;
                },
                error: err => console.log(err)
            }
            );

            setTimeout(() => {
                window.open(this.paymentUrl, '_blank');
            }, 2000);
        })




        // const orderInterval = setInterval(() => {
        //     this.orderService.createZaloPayOrder(paymentInfo).subscribe({
        //             next: data => {
        //                 this.paymentUrl = data.paymentOrderUrl;
        //                 // console.log(data.paymentOrderUrl);
        //                 console.log(this.paymentUrl);
        //                 if (this.paymentUrl !== undefined) {
        //                     clearInterval(orderInterval);
        //                 }
        //                 console.log(this.paymentUrl);
        //             },
        //             error: err => console.log(err)
        //         }
        //     );
        // }, 2000);


    }

    // Paypal Payment Gateway
    private initConfig(): void {
        // this.payPalConfig = {
        //     currency: this.productService.Currency.currency,
        //     clientId: environment.paypal_token,
        //     createOrderOnClient: (data) => < ICreateOrderRequest > {
        //       intent: 'CAPTURE',
        //       purchase_units: [{
        //           amount: {
        //             currency_code: this.productService.Currency.currency,
        //             value: this.amount,
        //             breakdown: {
        //                 item_total: {
        //                     currency_code: this.productService.Currency.currency,
        //                     value: this.amount
        //                 }
        //             }
        //           }
        //       }]
        //   },
        //     advanced: {
        //         commit: 'true'
        //     },
        //     style: {
        //         label: 'paypal',
        //         size:  'small', // small | medium | large | responsive
        //         shape: 'rect', // pill | rect
        //     },
        //     onApprove: (data, actions) => {
        //         this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
        //         console.log('onApprove - transaction was approved, but not authorized', data, actions);
        //         actions.order.get().then(details => {
        //             console.log('onApprove - you can get full order details inside onApprove: ', details);
        //         });
        //     },
        //     onClientAuthorization: (data) => {
        //         console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        //     },
        //     onCancel: (data, actions) => {
        //         console.log('OnCancel', data, actions);
        //     },
        //     onError: err => {
        //         console.log('OnError', err);
        //     },
        //     onClick: (data, actions) => {
        //         console.log('onClick', data, actions);
        //     }
        // };
    }


    // APP INFO
    checkPaymentStatus() {

    }

    onAddressSelected() {
        this.isAddress = false;
        if (this.shippingAddress) {
            this.isAddress = true;
            const userAddress = this.shippingAddress + ', Đà Nẵng';
            const shopId = this.products[0].id;
            this.orderService.getShippingCost(userAddress, shopId).subscribe((res) => {
                this.shippingResponse = res;
            })
        }
        else {
            this.shippingResponse = undefined;
        }
    }

    onLocalChange() {
        this.checkoutForm.patchValue({ address: [''] });
        this.isAddress = false;
        this.shippingResponse = undefined;
    }

    get shippingAddress() { return this.checkoutForm.get('address').value }
}
