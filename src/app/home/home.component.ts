import { viewClassName } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProductModelSever, serverResponse } from '../models/product.model';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

@ViewChild(HeaderComponent) child;
  products:any[];
  loading = false;
  

  constructor(private productService : ProductService,
      private  cartService : CartService,
    private router: Router) { }

  ngOnInit(){
    this.productService.getAllProducts().subscribe((prods : any) =>{
      this.products = prods;
      console.log(prods);
    },(error) =>{

    });
  }




  selectProduct(id: number){

this.router.navigate(['/product',id]).then();

  }

  AddToCart(id : number){
    this.loading = true;
    this.cartService.AddProductToCart(id);
    this.loading = false;
  }

}
