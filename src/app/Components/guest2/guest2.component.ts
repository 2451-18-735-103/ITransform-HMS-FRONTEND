import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/Models/guest';
import { GuestService } from 'src/app/_Services/guest.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-guest2',
  templateUrl: './guest2.component.html',
  styleUrls: ['./guest2.component.css']
})
export class Guest2Component implements OnInit {
  guests: Guest[] = [];
  selectedGuest: Guest = new Guest();

  constructor(private guestService: GuestService,
    private location: Location) { }

  ngOnInit(): void {
    this.getGuests();
  }

  getGuests() {
    this.guestService.getGuestList().subscribe(
      (data: any) => {
        this.guests = data;
      },
      (error) => {
        console.error('Error fetching guest list:', error);
      }
    );
  }
  deleteGuest(guestId: string) {
    if (confirm('Are you sure you want to delete this guest?')) {
      this.guestService.deleteGuestList(guestId).subscribe(

        (error) => {
          console.error('Error deleting guest:', error);
        },
        () => {
          // Filter out the deleted guest from the local array
          this.guests = this.guests.filter(guest => guest.guestId !== guestId);
          console.log('Guest deleted successfully');
        }
      );
    }
  }


  goBack() {
    this.location.back();
  }

}
