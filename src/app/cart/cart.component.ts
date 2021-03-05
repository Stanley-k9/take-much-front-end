import { Component, OnInit } from '@angular/core';
import { cartModelsever } from '../models/cart.model';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData : cartModelsever;
  cartTotal : any;
  subTotal : any;
  constructor( public cartService : CartService) { }

  ngOnInit(): void {

    this.cartService.cartDataObs$.subscribe( (data : cartModelsever) => this.cartData = data);
    this.cartService.cartTotal$.subscribe( total => this.cartTotal = total);

  }



  changeQuantity(index : number ,increase : boolean){

    this.cartService.UpdateCartData(index, increase);

  }

}
