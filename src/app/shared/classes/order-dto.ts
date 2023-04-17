import { OrderDetail } from "./order-detail";

export class OrderDto {
    address: string;
    lat: string;
    lng: string;
    orderDetails: OrderDetail[];
    orderTrackingNumber: string;
    paymentMethod: string;
    shippingCost: number;
    status: 'AWAITING';
}