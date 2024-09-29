import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../Models/room'; // Import your Room model

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl: string = "http://localhost:9382/room"; // Adjust the base URL as needed

  constructor(private httpClient: HttpClient) { }
  addRoom(room: Room) {
    console.log(room.allRoom);

    return this.httpClient.post<Room>("http://localhost:9382/room/addroom", room);
  }
  getRoomList(): Observable<Room> {
    return this.httpClient.get<Room>("http://localhost:9382/room/viewallrooms");
  }



  updateRoom(roomId: string, room: Room): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/updateroom/${roomId}`, room);
  }

  deleteRoom(roomId: string): Observable<any> {
    const url = `${this.baseUrl}/deleteroom/${roomId}`;
    console.log('Delete URL:', url);
    return this.httpClient.delete(url);
  }
  viewRoomById(roomId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/viewroombyid/${roomId}`);
  }
}
