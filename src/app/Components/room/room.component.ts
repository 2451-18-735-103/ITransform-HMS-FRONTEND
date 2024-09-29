import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Room } from 'src/app/Models/room'; // Make sure the path is correct
import { RoomService } from 'src/app/_Services/room.service';
import { Location } from '@angular/common';
import { UserAuthService } from 'src/app/_Services/user-auth.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  addingRoom = false; // Flag to determine if you're adding or editing
  room: Room[] = [];
  roomForm!: FormGroup;
  selectedRoomType: string = '';
  selectedRoom: Room = new Room();
  searchText: string = ''; originalRoomList: Room[] = [];
  constructor(private roomService: RoomService, private formBuilder: FormBuilder,
    private location: Location,
    private userAuthService: UserAuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      roomId: [''],
      roomType: ['', Validators.required],
      roomRent: ['', Validators.required],
      roomAvailable: ['', Validators.required],
    });

    this.getRooms();
  }


  filterRooms() {
    if (!this.originalRoomList.length) {
      this.originalRoomList = [...this.room]; // Store the original room list
    }

    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      if (searchTextLower === 'ac' || searchTextLower === 'a') {
        this.room = this.originalRoomList.filter((room: Room) =>
          room.roomType.toLowerCase() === 'ac'
        );
      } else if (searchTextLower === 'non-ac' || searchTextLower === 'n') {
        this.room = this.originalRoomList.filter((room: Room) =>
          room.roomType.toLowerCase() === 'non-ac'
        );
      } else {
        this.room = []; // If searchText is neither 'a' nor 'n', no data will be displayed
      }
    } else {
      this.room = this.originalRoomList; // Restore the original room list when the search text is empty
    }
  }
  hasManagerRole(): boolean {
    const roles: { roleName: string }[] = this.userAuthService.getRoles() || [];
    return roles.some(role => role.roleName === 'ROLE_MANAGER');
  }
  hasReceptionistRole(): boolean {
    const roles: { roleName: string }[] = this.userAuthService.getRoles() || [];
    return roles.some(role => role.roleName === 'ROLE_RECEPTIONIST');
  }

  getRooms() {
    this.roomService.getRoomList().subscribe(
      (data: Room[] | Room) => {
        if (Array.isArray(data)) {
          // Check if the response is an array (list of rooms)
          this.room = data;
        } else {
          // If it's not an array, consider it a single room and put it in an array
          this.room = [data];
        }
      },
      (err: any) => {
        console.error('Error occurred while fetching room list.', err);
      }
    );
  }


  onAddRoom() {
    this.addingRoom = true;
    this.selectedRoom = new Room();
    this.roomForm.reset();
  }

  onEditRoom(room: Room) {
    this.addingRoom = true;
    this.selectedRoom = room;
    this.roomForm.setValue({
      roomId: room.roomId,
      roomType: room.roomType,
      roomRent: room.roomRent,
      roomAvailable: room.roomAvailable
    });
  }

  addRoom() {
    const roomData = this.roomForm.value;

    if (this.room.find((r: Room) => r.roomId === roomData.roomId)) {

      Swal.fire({
        icon: 'error',
        title: 'A room with the same ID already exists.',
        showConfirmButton: false,
        timer: 1500

      });
      setTimeout(() => {
        $('#roomModal').modal('hide');
        this.router.navigate(['/room']);
      }, 1500);
    } else {
      this.roomService.addRoom(roomData).subscribe(
        (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Room not Added ',
            showConfirmButton: false,
            timer: 1500

          });
          setTimeout(() => {
            window.location.href = "/room";
          }, 1500);
        },
        (data: Room) => {
          Swal.fire({
            icon: 'success',
            title: 'Room Added successfully ',
            showConfirmButton: false,
            timer: 1500

          });
          setTimeout(() => {
            window.location.href = "/room";
          }, 1500);
        },
        
      );
    }
  }
  goBack() {
    this.location.back();
  }
  updateRoom() {
    const roomData = this.roomForm.value;

    this.roomService.updateRoom(this.selectedRoom.roomId, roomData).subscribe(
      
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Room not updated.',
          showConfirmButton: false,
          timer: 1900

        });
        setTimeout(() => {
          $('#roomModal').modal('hide');
          window.location.href = "/room";
        }, 1900);
      },
      (data: Room) => {
        
        Swal.fire({
          icon: 'success',
          title: 'Room updated successfully ',
          showConfirmButton: false,
          timer: 1500

        });
        setTimeout(() => {
          window.location.href = "/room";
        }, 1500);
      }
    );
  }

  deleteRoom(roomId: string) {
    this.roomService.deleteRoom(roomId).subscribe(
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Room not deleted',
          showConfirmButton: false,
          timer: 1500
  
        });
        setTimeout(() => {
          window.location.href = "/room";
        }, 1500);
      },
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Room deleted successfully ',
          showConfirmButton: false,
          timer: 1500

        });
        setTimeout(() => {
          window.location.href = "/room";
        }, 1500);
    });
  }
}
