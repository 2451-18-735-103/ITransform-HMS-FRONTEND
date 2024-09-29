import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/Models/staff';
import { StaffService } from 'src/app/_Services/staff.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-staff2',
  templateUrl: './staff2.component.html',
  styleUrls: ['./staff2.component.css']
})
export class Staff2Component implements OnInit {
  staffList: Staff[] = [];

  constructor(private staffService: StaffService, private location: Location) { }

  ngOnInit() {
    this.getStaffList();
  }

  getStaffList() {
    this.staffService.getStaffList().subscribe(
      (data: any) => {
        this.staffList = data;
      },
      (error) => {
        console.error('Error occurred while fetching staff members:', error);
      }
    );
  }
  goBack() {
    this.location.back();
  }
  
}
