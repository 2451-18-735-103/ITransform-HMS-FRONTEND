import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../Models/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private baseUrl: string = 'http://localhost:9381/staff';

  constructor(private httpClient: HttpClient) { }

  // Create a new staff member
  addStaff(staff: Staff) {
    return this.httpClient.post<Staff>("http://localhost:9381/staff/addstaff", staff);
  }

  getStaffList(): Observable<Staff> {
    return this.httpClient.get<Staff>("http://localhost:9381/staff/viewallstaff");
  }
  // Update staff details
  updateStaff(staffId: string, staff: Staff): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/updatestaff/${staffId}`, staff);
  }

  // Delete a staff member by ID
  deleteStaff(staffId: string): Observable<any> {
    const url = `${this.baseUrl}/deletestaff/${staffId}`;
    console.log("Delete URL :", url);
    return this.httpClient.delete(url);
  }

  viewStaffById(staffId: string): Observable<any> {
    // const url = `${this.baseUrl}/viewstaffbyid
    const url = `${this.baseUrl}/viewstaffbyid/${staffId}`;
    return this.httpClient.get(url);
  }
}

