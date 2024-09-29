import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient for making HTTP requests
import { BehaviorSubject, Observable } from 'rxjs';

declare var paypal: any;

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getPaymentStatus(): Observable<boolean> {
    return this.paymentStatusSubject.asObservable();
  }

  updatePaymentStatus(status: boolean): void {
    this.paymentStatusSubject.next(status);
  }
}