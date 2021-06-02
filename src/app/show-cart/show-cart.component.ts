import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/Cart';
import { LaptopDetails } from '../models/Laptop';
import { ShowCart } from '../models/show-cart';
import { RestCartService } from '../apipath/restCart.service';
import { ShowCartsService } from '../services/show-cart.service';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.css'],
})
export class ShowCartComponent implements OnInit {
  cart: Cart = new Cart();
  items: Array<LaptopDetails> = [];
  carts: Array<Cart> = [];
  showCarts: Array<ShowCart> = [];
  showCart: ShowCart = new ShowCart();

  constructor(
    private cartService: RestCartService,
    private showCartService: ShowCartsService
  ) {}

  ngOnInit() {
    this.cartService.getAllCarts().subscribe(
      (data) => {
        console.log('Carts: ' + JSON.stringify(data));
        this.carts = data;
        this.showCartService.buildShowCart(this.carts);
      },
      (error) => console.log(error)
    );

    this.buildView();
  }

  buildView() {
    let showSession = sessionStorage.getItem('show');
    console.log('buildView: ' + showSession);
    if (showSession != null) {
      this.showCarts = JSON.parse(showSession);
      //this.showCarts = this.showCarts.sort((a, b) => a.valorTotal - b.valorTotal);
    }

    console.log('showCarts: ' + JSON.stringify(this.showCarts));
  }
}
