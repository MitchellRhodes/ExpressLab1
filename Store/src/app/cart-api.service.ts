import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './Item';


@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private http: HttpClient) { }

  getAllItems() {
    return this.http.get(`http://localhost:8888/cart-items`);
  };

  deleteItem(id: number) {
    return this.http.delete(`http://localhost:8888/cart-items${id}`);
  };

  addItem(item: Item) {
    // return this.http.post(`http://localhost:8888/cart-items`);
  }
}
