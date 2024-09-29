import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/Models/reservation';
import { ReservationService } from 'src/app/_Services/reservation.service';
import { Location } from '@angular/common';
import { RoomService } from 'src/app/_Services/room.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Guest } from 'src/app/Models/guest';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  formValue!: FormGroup;
  editReservationForm!: FormGroup;
  reservations: Reservation[] = [];
  guests:Guest[]=[];
  reservationToAdd: Reservation = new Reservation();
  successMessage: string = '';
  editReservation: Reservation = new Reservation();
  addReservationModal: any; roomDetailsDisabled: boolean = true;
  todayDate: string | undefined;
  reservation: any;
  paymentStatus: boolean = false;
  paymentSubscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router, private location: Location,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.formValue = this.formBuilder.group({
      reservationId: [''],
      roomId: [''],
      guestId: [''],
      checkInDate: [''],
      checkOutDate: [''],
      noOfGuest: [''],
    });

    this.editReservationForm = this.formBuilder.group({
      editReservationId: [''],
      editRoomId: [''],
      editGuestId: [''],
      editCheckInDate: [''],
      editCheckOutDate: [''],
      editNoOfGuest: [''],
    });

    this.getReservations();
    this.todayDate = new Date().toISOString().split('T')[0];
  }
  roomDetails: any = {};
  getReservations() {
    this.reservationService.viewAllReservations().subscribe(
      (data: Reservation[]) => {
        this.reservations = data;

      },
      (error) => {
        console.error('Error occurred while fetching reservations.', error);
      }
    );
  }

  updateReservation() {
    this.editReservation = {
      reservationId: this.editReservationForm.value.editReservationId,
      roomId: this.editReservationForm.value.editRoomId,
      guestId: this.editReservationForm.value.editGuestId,
      checkInDate: this.editReservationForm.value.editCheckInDate,
      checkOutDate: this.editReservationForm.value.editCheckOutDate,
      noOfGuest: this.editReservationForm.value.editNoOfGuest,
      totalPrice: 0,
    };

    this.reservationService.updateReservation(this.editReservation.reservationId, this.editReservation).subscribe(
      
      (error) => {
        Swal.fire({
          icon: 'error',
          title: `Reservation not successful for Guest ${this.editReservation.guestId}.`,
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = "/reservation";
        }, 1500);
      },
      (data: string) => {
        
        Swal.fire({
          icon: 'success',
          title: `Reservation updated for Guest ${this.editReservation.guestId}.`,
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = "/reservation";
        }, 1500);
      }
    );
  }
  fetchRoomDetails() {
    const roomId = this.formValue.value.roomId;

    this.roomService.viewRoomById(roomId).subscribe(
      (room: any) => {
        this.roomDetails = [room];


        this.roomDetailsDisabled = false;
      },
      (error) => {
        console.error('Error fetching room details:', error);
        alert('Error fetching room details.');
        this.roomDetailsDisabled = true;
      }
    );
  }



  addReservation() {
    const reservationToAdd: Reservation = {
      reservationId: this.formValue.value.reservationId,
      roomId: this.formValue.value.roomId,
      guestId: this.formValue.value.guestId,
      checkInDate: this.formValue.value.checkInDate,
      checkOutDate: this.formValue.value.checkOutDate,
      noOfGuest: this.formValue.value.noOfGuest,
      totalPrice: 0,
    };
    const guestExists = this.guests.some(existingGuest =>
      existingGuest.guestId === reservationToAdd.guestId
    );
  
    if (!guestExists) {
      Swal.fire({
        icon: 'error',
        title: 'Guest ID does not exist. Please enter a valid Guest ID.',
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(()=>{
        window.location.href = "/reservation"
      },1500) 
    }
  

    const reservationExists = this.reservations.some(existingReservation =>
      existingReservation.reservationId === reservationToAdd.reservationId ||
      existingReservation.roomId === reservationToAdd.roomId
    );

    if (reservationExists) {
      
      Swal.fire({
        icon: 'error',
        title: 'Reservation with the same Reservation ID or Room ID already exists.',
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        window.location.href = "/reservation";
      }, 1500);
      this.formValue.reset();
    } else {
      this.reservationService.addReservation(reservationToAdd).subscribe(
        

        (error) => {
          Swal.fire({
            icon: 'error',
            title: `Reservation failed for Guest ${reservationToAdd.guestId}.`,
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            window.location.href = "/reservation";
          }, 1500);

        },
        (data: string) => {
          
          Swal.fire({
            icon: 'success',
            title: `Reservation success for Guest ${reservationToAdd.guestId}.`,
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            window.location.href = "/reservation";
          }, 1500);

        }
      );
    }
  }

  onEditReservation(reservation: Reservation) {
    this.editReservationForm.setValue({
      editReservationId: reservation.reservationId,
      editRoomId: reservation.roomId,
      editGuestId: reservation.guestId,
      editCheckInDate: reservation.checkInDate,
      editCheckOutDate: reservation.checkOutDate,
      editNoOfGuest: reservation.noOfGuest,
    });
  }

  deleteReservation(reservationId: any) {
    console.log('Deleting reservation with guestId: ', reservationId);

    this.reservationService.deleteReservation(reservationId).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    Swal.fire({
      icon: 'success',
      title: 'Reservation deleted Successfully.',
      showConfirmButton: false,
      timer: 1500

    });
    setTimeout(() => {
      window.location.href = "/reservation";
    }, 1500);
  } goBack() {
    this.location.back();
  }
}
