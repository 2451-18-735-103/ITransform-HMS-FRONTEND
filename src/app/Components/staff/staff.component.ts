import { Component, OnInit } from '@angular/core';

import { Staff } from 'src/app/Models/staff';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from 'src/app/_Services/staff.service';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  res: Staff = new Staff;
  staff: any;
   isEditMode:boolean=false;
  editStaffForm!: FormGroup;
  staffForm!: FormGroup;
  staffId: any;
  searchStaffId: string = '';
  searchResults: any[] = [];
  searchStaffName: string = '';
  constructor(private staffService: StaffService
    , private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private fb: FormBuilder) {
    this.staffForm = this.fb.group({
      staffId: ['', [Validators.required, Validators.pattern('^[1-9]\\d{0,3}$')]],
      // ... other form controls
    });
  }

  ngOnInit(): void {
    this.staffForm = this.formBuilder.group({
      staffId: [''],
      staffName: [''],
      address: [''],
      salary: [''],
      emailId: [''],
      age: ['']
    });
    this.getStaffs();
  }
  goBack() {
    this.location.back();
  }
  get staffIdControl() {
    return this.staffForm.get('staffId');
  }
  getStaffs() {
    this.staffService.getStaffList().subscribe(
      (data: any) => {
        this.staff = data;
      },
      (err: any) => {
        console.error('Error occurred while fetching staff list.', err);
      }
    );
  }


  addStaff() {
    this.res.staffId = this.staffForm.value.staffId;
    this.res.staffName = this.staffForm.value.staffName;
    this.res.address = this.staffForm.value.address;
    this.res.salary = this.staffForm.value.salary;
    this.res.emailId = this.staffForm.value.emailId;
    this.res.age = this.staffForm.value.age;

  
  const existingStaff = this.staff.find((stf: Staff) => stf.staffId === this.res.staffId);
      if (existingStaff) {
        Swal.fire({
          icon: 'error',
          title: 'Staff ID Already Exists',
          text: 'A record with the same ID already exists.',
          showConfirmButton: true,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = "/staff";
        }, 1500);

      } else {
        this.staffService.addStaff(this.res).subscribe(
          (err: any) => {
            console.error('Error occurred while adding staff.', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while adding staff.'
            });
          },
          (data: Staff) => {
          this.getStaffs();
          Swal.fire({
            icon: 'success',
            title: 'Staff Added Successfully.',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            window.location.href = "/staff";
          }, 1500);
          
        } );
      }
    }
  

  deleteStaff(staffId: string) {
    console.log('Deleting staff with staffId: ', staffId);

    this.staffService.deleteStaff(staffId).subscribe(
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Staff not deleted.',
          showConfirmButton: false,
          timer: 1500
  
        });
        setTimeout(() => {
          window.location.href = "/staff";
        }, 1500);
      },
      () => {
      
      Swal.fire({
        icon: 'success',
        title: 'Staff  deleted successfully.',
        showConfirmButton: false,
        timer: 1500

      });
      setTimeout(() => {
        window.location.href = "/staff";
      }, 1500);
    } );
  }
  onEditStaff(staff: Staff) {
    this.staffId = staff.staffId;
    this.staffForm.setValue({
      staffId: staff.staffId,
      staffName: staff.staffName,
      address: staff.address,
      salary: staff.salary,
      emailId: staff.emailId,
      age: staff.age,
    });
    this.isEditMode=true;

  }

  updateStaff() {
    this.staffService.updateStaff(this.staffId, this.staffForm.value).subscribe(
      
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Staff not updated',
          showConfirmButton: false,
          timer: 1500

        });
        setTimeout(() => {
          window.location.href = "/staff";
        }, 1500);


      },
      (data: any) => {
       
        Swal.fire({
          icon: 'success',
          title: 'Staff  updated',
          showConfirmButton: false,
          timer: 1500

        });
        setTimeout(() => {
          window.location.href = "/staff";
        }, 1500);
        this.isEditMode=false;

      }
    );
  }


  onSearch() {
    const searchValue = this.searchStaffName.toLowerCase();
    if (searchValue) {

      this.searchResults = this.staff.filter((staff: any) =>
        staff.staffName.toLowerCase().includes(searchValue)
      );
    } else {
      this.searchResults = [];
    }
  }

}
