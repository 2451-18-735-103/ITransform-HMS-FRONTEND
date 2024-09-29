import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from '../Models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private baseUrl1 = "http://localhost:9001/guest";
  postGuest: any;
  baseURL!: string;

  constructor(private httpClient: HttpClient) { }

  getGuestList(): Observable<Guest> {
    return this.httpClient.get<Guest>("http://localhost:9001/guest/viewall");
  }
  addGuestList(guest: Guest) {

    console.log(guest.allGuest);

    return this.httpClient.post<Guest>("http://localhost:9001/guest/add", guest);

  }

  updateGuestList(guest: Guest, id: string) {
    return this.httpClient.put<Guest>(`http://localhost:9001/guest/update/${id}`, guest);
  }

  deleteGuestList(guestId: string): Observable<any> {
    const url = `${this.baseUrl1}/delete/${guestId}`;
    console.log('Delete URL:', url); // Check if this URL is formed correctly
    return this.httpClient.delete(url);
  }


}
