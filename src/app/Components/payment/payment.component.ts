import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/_Services/payment.service';
import { Location } from '@angular/common';
declare var Razorpay: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'] // Add your CSS file here
})
export class PaymentComponent implements OnInit {
  amount: number = 1000;
  userName: string = '';
  email: string = '';
  contact: string = '';
  loading: boolean = false;
  error: string | null = null;
  totalPrice: number = 1000;
  razorpay: any;

  constructor(private router: Router,
    private route: ActivatedRoute, private paymentService: PaymentService,
    private location: Location) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const totalPriceParam = params.get('totalPrice');
      if (totalPriceParam !== null) {
        this.totalPrice = parseFloat(totalPriceParam);

        this.razorpay = new Razorpay({
          key: 'rzp_test_snlafEGVB0JDKh',
          amount: this.totalPrice * 100, // Convert to paise
        });
      }
    });
  }

  async createOrder() {
    try {
      this.loading = true;

      // Replace this with your server API endpoint to create the order
      const response = await fetch(`http://localhost:9999/getAmount/${this.totalPrice * 100}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const orderData = await response.json();
        this.loading = false;
        return orderData.orderId;
      } else {
        throw new Error('Failed to create the order');
      }
    } catch (error) {
      this.loading = false;
      this.error = 'Error creating order. Please try again.';
      console.error('Error creating order:', error);
      throw error;
    }
  }

  handlePayment() {

    this.createOrder().then((order) => {
      if (!order) return;

      const options = {
        key: 'rzp_test_snlafEGVB0JDKh',
        amount: this.totalPrice * 100,
        currency: 'INR',
        name: this.userName,
        description: 'Test Transaction',
        order_id: order,
        handler: (response: any) => {
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_amount: this.totalPrice,
          };


          const paymentInfo = `Payment ID: ${paymentDetails.razorpay_payment_id}\nOrder ID: ${paymentDetails.razorpay_order_id}\nAmount: ${paymentDetails.razorpay_amount}`;
          alert(paymentInfo);

          this.router.navigate(['/home']);
        },
        prefill: {
          name: this.userName,
          email: this.email,
          contact: this.contact,
        },
        notes: {
          address: 'ABC, Delhi',
        },
        theme: {
          color: '#3399cc',
        },
      };

      try {
        const rzp1 = new Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error('Error initializing Razorpay:', error);
      }
    });
  }
  ngAfterViewInit() {

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = false;
    script.onload = () => {

      this.razorpay = new Razorpay({
        key: 'rzp_test_snlafEGVB0JDKh',
      });
    };
    document.head.appendChild(script);
  }
  goBack() {
    this.location.back();
  }
}
