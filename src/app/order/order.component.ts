import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products : any;
  src:any;
  type=false;
  user:any;
  constructor(private orderservice : OrderService) { }


  ngOnInit(): void {
    this.user = JSON.parse( localStorage.getItem("user"));
 console.log("user id",this.user.user_id);
 console.log("role",this.user.type);

if(this.user != null || undefined){
  if(this.user.type == "delivery"){
    this.type = true;
 
    this.orderservice.getOrders().subscribe((prods) =>{
      this.products = prods;
    },(error) =>{

    });
  }else{
console.log("else block")
    this.orderservice.getMyOrders(this.user.user_id).subscribe((prods) =>{
      this.products = prods;

      console.log("products",this.products);
    },(error) =>{
      console.log(error);

    });
  
  }
}
 



  }


}




