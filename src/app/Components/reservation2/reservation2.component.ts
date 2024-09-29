import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/Models/reservation';
import { ReservationService } from 'src/app/_Services/reservation.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-reservation2',
  templateUrl: './reservation2.component.html',
  styleUrls: ['./reservation2.component.css']
})
export class Reservation2Component implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService,
    private location: Location) { }

  ngOnInit() {
    this.getReservations();
  }
  goBack() {
    this.location.back();
  }
  getReservations() {
    this.reservationService.viewAllReservations().subscribe(
      (data: Reservation[]) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Error occurred while fetching reservations:', error);
      }
    );
  }



}
