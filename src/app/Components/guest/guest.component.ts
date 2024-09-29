import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Guest } from 'src/app/Models/guest';
import { GuestService } from 'src/app/_Services/guest.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  res: Guest = new Guest;
  formValue!: FormGroup
  reservation: any
  guestId: any
  guest: any;
  addGuestList: any;
  isEditMode: boolean = false;
  constructor(private guestService: GuestService, private formBuilder: FormBuilder,
    private location: Location) { }

  ngOnInit() {
    this.formValue = this.formBuilder.group({

      guestId: [''],

      guestName: [''],

      guestEmail: [''],

      guestGender: [''],

      guestAddress: [''],

      guestContact: ['']

    })

    this.getguests();

  }

  getguests() {
    this.guestService.getGuestList().subscribe(
      (data: any) => {
        this.guest = data;
      },
      (err: any) => {
        console.error('Error occurred while fetching guest list.', err);
      }
    );
  }
  addGuest() {
    this.res.guestId = this.formValue.value.guestId;
    this.res.guestName = this.formValue.value.guestName;
    this.res.guestEmail = this.formValue.value.guestEmail;
    this.res.guestGender = this.formValue.value.guestGender;
    this.res.guestAddress = this.formValue.value.guestAddress;
    this.res.guestContact = this.formValue.value.guestContact;
    const guestExists = this.guest.find((existingGuest: Guest) => existingGuest.guestId === this.res.guestId);

    if (guestExists) {

      Swal.fire({
        icon: 'error',
        title: 'Guest with the same ID already exists.',
        showConfirmButton: false,
        timer: 1500

      });
      setTimeout(() => {
        window.location.href = "/guest";
      }, 1500);
    } else {
      this.guestService.addGuestList(this.res).subscribe((data: Guest) => {
        this.getguests();
        Swal.fire({
          icon: 'success',
          title: 'Guest Added Successfully.',
          showConfirmButton: false,
          timer: 1500

        });
        setTimeout(() => {
          window.location.href = "/guest";
        }, 1500);

      }, (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Guest not Added',
          showConfirmButton: false,
          timer: 1500

        });
        setTimeout(() => {
          window.location.href = "/guest";
        }, 1500);
      });
    }
  }



  updateGuests() {
    this.res.guestId = this.formValue.value.guestId;
    this.res.guestName = this.formValue.value.guestName;
    this.res.guestEmail = this.formValue.value.guestEmail;
    this.res.guestGender = this.formValue.value.guestGender;
    this.res.guestAddress = this.formValue.value.guestAddress;
    this.res.guestContact = this.formValue.value.guestContact;

    console.log("Updated Guest Data:", this.res);

    this.guestService.updateGuestList(this.res, this.res.guestId).subscribe(
      (data: any) => {
        console.log("Update Response:", data);
        Swal.fire({
          icon: 'success',
          title: 'Guest updated Successfully.',
          showConfirmButton: false,
          timer: 1500

        });
        setTimeout(() => {
          window.location.href = "/guest";
        }, 1500);

        this.isEditMode = false;
      },
      (error: any) => {
        alert(error);
      }
    );
  }



  deleteGuests(guestId: any) {
    console.log('Deleting guest with guestId: ', guestId);

    this.guestService.deleteGuestList(guestId).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    Swal.fire({
      icon: 'success',
      title: 'Guest deleted Successfully.',
      showConfirmButton: false,
      timer: 1500

    });
    setTimeout(() => {
      window.location.href = "/guest";
    }, 1500);
  }


  onEditGue(guest: Guest) {
    this.formValue.controls['guestId'].setValue(guest.guestId);
    this.formValue.controls['guestName'].setValue(guest.guestName);
    this.formValue.controls['guestEmail'].setValue(guest.guestEmail);
    this.formValue.controls['guestGender'].setValue(guest.guestGender);
    this.formValue.controls['guestAddress'].setValue(guest.guestAddress);
    this.formValue.controls['guestContact'].setValue(guest.guestContact);

    this.isEditMode = true;
  }
  goBack() {
    this.location.back();
  }
}

