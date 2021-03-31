import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  noOfCustomers : any;
  noOfDeliveries : any;
  noOfProducts : any;
  sales : any;
  products : any;

  constructor(private userService : UserService,
      private productService : ProductService,
      private orderservice : OrderService) { }

  ngOnInit(): void {
    
    this.userService.noOfCustomers().subscribe((noOfUser)=>{
      this.noOfCustomers = noOfUser;
    });

    this.userService.noOfDelivery().subscribe((noOfDelivery)=>{
this.noOfDeliveries = noOfDelivery;
    });

    this.productService.noOfProducts().subscribe((noOfProds)=>{
this.noOfProducts = noOfProds;
    });

    this.productService.sales().subscribe((sale)=>{
this.sales = sale;
    });


    this.orderservice.allOrders().subscribe((prods) =>{
      this.products = prods;
    },(error) =>{

    });

  }

}
