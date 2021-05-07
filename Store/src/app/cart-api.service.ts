import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './Item';


@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  createJson = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getAllItems() {
    return this.http.get(`http://localhost:8888/cart-items`) as Observable<Item[]>;
  };

  deleteItem(id: number) {
    return this.http.delete(`http://localhost:8888/cart-items/${id}`).subscribe(() => {
      console.log('delete finished')
    });
  };

  addItem(item: Item) {
    return this.http.post<Item>(`http://localhost:8888/cart-items`, item, this.createJson)
  }
}


