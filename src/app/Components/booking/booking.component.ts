import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  reservationId: string = '';
  roomId: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  totalPrice: string = '';

  constructor(private http: HttpClient, private router: Router,
    private location: Location) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }

  fetchReservationDetails() {
    this.http.get<any>(`http://localhost:8082/reservation/viewreservation/${this.reservationId}`)
      .subscribe(
        (response) => {
          this.roomId = response.roomId;
          this.checkInDate = response.checkInDate;
          this.checkOutDate = response.checkOutDate;
          this.totalPrice = response.totalPrice;
        },
        (error) => {
          console.error('Error fetching reservation details:', error);
          alert('Give a valid ReservationId');
        }
      );
  }


  handlePayment() {
    if (!this.reservationId) {
      alert('Give a valid ReservationId');
    } else {
      this.router.navigate(['/payment', this.totalPrice]);
    }
  }

}
