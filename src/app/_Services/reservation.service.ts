import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8082/reservation'; // Update with your API URL
  totalPrice: any;

  constructor(private http: HttpClient) { }

  addReservation(reservation: any): Observable<string> {
    return this.http.post<string>("http://localhost:8082/reservation/addreservation", reservation);
  }

  updateReservation(reservationId: string, reservation: any): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/updatereservation/${reservationId}`, reservation);
  }

  deleteReservation(reservationId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/deletereservation/${reservationId}`);
  }

  viewReservation(reservationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/viewreservation/${reservationId}`);
  }

  viewAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/viewAllReservations`);
  }
  getTotalPriceForReservation(reservationId: string): Observable<number> {
    const url = `${this.apiUrl}/getTotalPrice/${reservationId}`;
    return this.http.get<number>(url);
  }
}

