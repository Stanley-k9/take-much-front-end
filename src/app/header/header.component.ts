import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { cartModelsever } from '../models/cart.model';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartData : cartModelsever;
  cartTotal :  any;
  authState: boolean;
  title : any;
  user : any;
  constructor(public cartService : CartService,
                    private userService : UserService,
                    private productService : ProductService) { }

  ngOnInit(): void {

    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.userService.authState$.subscribe(authstate => this.authState = authstate);
    this.user = JSON.parse( localStorage.getItem("user"));
    
  }

 search(){
   this.productService.getProductsOfCat(this.title);
 }


}
