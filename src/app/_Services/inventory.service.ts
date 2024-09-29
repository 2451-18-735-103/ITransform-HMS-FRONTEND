import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../Models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = "http://localhost:8081/inventory"; // Update the base URL to match the inventory endpoint
  postInventory: any;
  baseURL!: string;
  constructor(private httpClient: HttpClient) { }

  getInventoryList(): Observable<Inventory> {
    return this.httpClient.get<Inventory>("http://localhost:8081/inventory/viewall");
  }

  addInventoryList(inventory: Inventory): Observable<Inventory> {
    return this.httpClient.post<Inventory>("http://localhost:8081/inventory/add", inventory);
  }

  updateInventoryList(inventory: Inventory, inventoryId: string): Observable<Inventory> {
    const url = `${this.baseUrl}/update/${inventoryId}`;
    return this.httpClient.put<Inventory>(url, inventory);
  }

  deleteInventoryList(inventoryId: string): Observable<any> {
    const url = `${this.baseUrl}/delete/${inventoryId}`;
    console.log('Delete URL:', url); // Check if this URL is formed correctly
    return this.httpClient.delete(url);
  }
}