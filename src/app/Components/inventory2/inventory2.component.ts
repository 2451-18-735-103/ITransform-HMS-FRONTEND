import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/Models/inventory';
import { InventoryService } from 'src/app/_Services/inventory.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-inventory2',
  templateUrl: './inventory2.component.html',
  styleUrls: ['./inventory2.component.css']
})
export class Inventory2Component implements OnInit {
  inventories: Inventory[] = [];

  constructor(private inventoryService: InventoryService, private location: Location) { }

  ngOnInit() {
    this.getInventoryList();
  }

  getInventoryList() {
    this.inventoryService.getInventoryList().subscribe(
      (data: any) => {
        this.inventories = data;
      },
      (error) => {
        console.error('Error occurred while fetching inventories:', error);
      }
    );
  }
  goBack() {
    this.location.back();
  }

}


