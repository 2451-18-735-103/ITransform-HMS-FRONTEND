import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/Models/room';
import { RoomService } from 'src/app/_Services/room.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-room2',
  templateUrl: './room2.component.html',
  styleUrls: ['./room2.component.css']
})
export class Room2Component implements OnInit {
  roomList: Room[] = [];

  constructor(private roomService: RoomService,
    private location: Location) { }

  ngOnInit(): void {
    this.getRoomList();
  }

  getRoomList() {
    this.roomService.getRoomList().subscribe(
      (data: any) => {
        this.roomList = data;
      },
      (error) => {
        console.error('Error occurred while fetching room list:', error);
      }
    );
  }
  goBack() {
    this.location.back();
  }
} {

}
