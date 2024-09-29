import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Inventory } from 'src/app/Models/inventory';
import { InventoryService } from 'src/app/_Services/inventory.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  res: Inventory = new Inventory();
  formValue!: FormGroup;
  inventory: any;
  isEditing = false;
  page = 1; // Current page number
  pageSize = 10; // Items per page
  totalItems = 0;
  constructor(private inventoryService: InventoryService, private formBuilder: FormBuilder,
    private location: Location) { }

  ngOnInit() {
    this.formValue = this.formBuilder.group({
      inventoryId: [''],
      inventoryType: [''],
      inventoryName: [''],
      inventoryStock: ['']
    });

    this.getInventoryList();
  }

  getInventoryList() {
    this.inventoryService.getInventoryList().subscribe(
      (data: any) => {
        this.inventory = data;
      },
      (err: any) => {
        console.error('Error occurred while fetching inventory list.', err);
      }
    );
  }
  goBack() {
    this.location.back();
  }

  toggleEditState(inventory: Inventory) {
    this.isEditing = true;
    this.formValue.controls['inventoryId'].setValue(inventory.inventoryId);
    this.formValue.controls['inventoryType'].setValue(inventory.inventoryType);
    this.formValue.controls['inventoryName'].setValue(inventory.inventoryName);
    this.formValue.controls['inventoryStock'].setValue(inventory.inventoryStock);
  }



  addInventory() {
    if (this.isEditing) {
      this.updateInventory();
    } else {
      this.res.inventoryId = this.formValue.value.inventoryId;
      this.res.inventoryType = this.formValue.value.inventoryType;
      this.res.inventoryName = this.formValue.value.inventoryName;
      this.res.inventoryStock = this.formValue.value.inventoryStock;

      const existingInventory = this.inventory.find((inv: Inventory) => inv.inventoryId === this.res.inventoryId);
      if (existingInventory) {
        Swal.fire({
          icon: 'error',
          title: 'Inventory ID Already Exists',
          text: 'A record with the same ID already exists.',
          showConfirmButton: true,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = "/inventory";
        }, 1500);

      } else {
        this.inventoryService.addInventoryList(this.res).subscribe((data: Inventory) => {
          this.getInventoryList();
          Swal.fire({
            icon: 'success',
            title: 'Inventory Added Successfully.',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            window.location.href = "/inventory";
          }, 1500);
          this.resetForm();
        }, (err: any) => {
          console.error('Error occurred while adding inventory.', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while adding inventory.'
          });
        });
      }
    }
  }

  updateInventory() {
    this.res.inventoryId = this.formValue.value.inventoryId;
    this.res.inventoryType = this.formValue.value.inventoryType;
    this.res.inventoryName = this.formValue.value.inventoryName;
    this.res.inventoryStock = this.formValue.value.inventoryStock;

    this.inventoryService.updateInventoryList(this.res, this.res.inventoryId).subscribe((data: any) => {
      console.log(data);
      alert("Updated");
      this.getInventoryList();
      this.resetForm();
      window.location.href = "/inventory";
    }, (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Inventory not updated',
        showConfirmButton: false,
        timer: 1500

      });
      setTimeout(() => {
        window.location.href = "/inventory";
      }, 1500);
    });
  }

  resetForm() {
    this.formValue.reset();
    this.isEditing = false;
  }

  deleteInventory(inventoryId: any) {
    console.log('Deleting inventory with inventoryId: ', inventoryId);

    this.inventoryService.deleteInventoryList(inventoryId).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    Swal.fire({
      icon: 'success',
      title: 'Inventory Deleted Successfully.',
      showConfirmButton: false,
      timer: 1500

    });
    setTimeout(() => {
      window.location.href = "/inventory";
    }, 1500);
  }
}
