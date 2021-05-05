import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartApiService } from '../cart-api.service';
import { Item } from '../Item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  items: Observable<any> | null = null;

  constructor(private service: CartApiService) {

  }

  ngOnInit(): void {
    this.items = this.service.getAllItems();
  }

}
