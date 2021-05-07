
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CartApiService } from '../cart-api.service';
import { Item } from '../Item';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  items: Observable<Item[]> | null = null;

  isRevealed = false;


  constructor(
    private service: CartApiService,
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.items = this.service.getAllItems();
  };

  removeItem(item: number) {
    this.service.deleteItem(item)
    this.getItems();
  }

  revealForm() {
    this.isRevealed = !this.isRevealed;
  }

  onSubmit(item: Item) {
    this.service.addItem(item);
    this.getItems();
  }

}
