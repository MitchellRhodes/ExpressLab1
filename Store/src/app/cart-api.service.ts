import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private http: HttpClient) { }

  getAllItems() {
    return this.http.get('localhost:8888/cart-items');
  };

  deleteItem(id: number) {
    return this.http.delete(`localhost:8888/cart-items/${id}`);
  };

  addItem() {
    // return this.http.post('localhost:8888/cart-items');
  }
}
