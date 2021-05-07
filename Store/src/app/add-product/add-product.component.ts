import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../Item';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @Output() submitted = new EventEmitter<Item>();

  createProduct: string = '';

  createPrice!: number;

  createQuantity!: number;

  constructor() { }

  ngOnInit(): void {
  }

  submitItem() {
    let newItem: any = {
      product: this.createProduct,
      price: +this.createPrice,
      quantity: +this.createQuantity
    }
    this.submitted.emit(newItem);
  }

}
