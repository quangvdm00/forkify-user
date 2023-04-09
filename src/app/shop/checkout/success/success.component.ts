import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../../shared/classes/order';
import {OrderService} from '../../../shared/services/order.service';
import {ProductService} from '../../../shared/services/product.service';
import {response} from "express";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit, OnDestroy {
    status = '1';
    public orderDetails: Order = {};
    currentStep = 1;
    numSteps = 4;
    orderStatus = 'ORDERED';
    orderId: number;
    orderStatusInterval;

    constructor(public productService: ProductService,
                private orderService: OrderService) {
    }

    ngOnInit(): void {
        this.orderService.checkoutItems.subscribe(response => this.orderDetails = response);
    }

    ngAfterViewInit() {
        this.nextStep();
        console.log(this.orderStatus);
        this.orderStatusInterval = setInterval(() => {
            this.orderService.getOrderStatusUpdates(this.orderDetails.orderId).subscribe(
                (next: string) => {
                    if (this.orderStatus !== next) {
                        this.nextStep();
                        this.orderStatus = next;
                        console.log(this.orderStatus);
                    }
                }
            );
        }, 5000);
    }

    nextStep() {
        this.currentStep++;
        if (this.currentStep > this.numSteps) {
            this.currentStep = 1;
        }
        var stepper = document.getElementById("stepper1");
        var steps = stepper.getElementsByClassName("step");

        Array.from(steps).forEach((step, index) => {
            let stepNum = index + 1;
            if (stepNum === this.currentStep) {
                this.addClass(step, "editing");
            } else {
                this.removeClass(step, "editing");
            }
            if (stepNum < this.currentStep) {
                this.addClass(step, "done");
            } else {
                this.removeClass(step, "done");
            }
        });
    }

    hasClass(elem, className) {
        return new RegExp(" " + className + " ").test(" " + elem.className + " ");
    }

    addClass(elem, className) {
        if (!this.hasClass(elem, className)) {
            elem.className += " " + className;
        }
    }

    removeClass(elem, className) {
        var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
        if (this.hasClass(elem, className)) {
            while (newClass.indexOf(" " + className + " ") >= 0) {
                newClass = newClass.replace(" " + className + " ", " ");
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, "");
        }
    }

    ngOnDestroy(): void {
        clearInterval(this.orderStatusInterval);
        console.log('done');
    }
}
