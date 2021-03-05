import { Component,ViewChild, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService,NgxSpinnerModule,NgxSpinnerComponent } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { cartModelsever } from '../models/cart.model';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

cartTotal : any;
cartData : cartModelsever;
showSpinner: Boolean;


order_id: number;
quantity: number;
id_id: number;
order_id_order_id : number;
order_details_list : any[];

@ViewChild('spinner',{read: TemplateRef})myspinner:TemplateRef<NgxSpinnerService>

user : any;
  constructor(private cartService: CartService,
              private orderService : OrderService,
              private router : Router,
              private spinner :NgxSpinnerService,
              private toast : ToastrService) { }

  ngOnInit(): void {

    this.cartService.cartDataObs$.subscribe((data : cartModelsever) => this.cartData = data)
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.user = JSON.parse( localStorage.getItem("user"));
    this.order_details_list = [];
  }

    onCheckOut(){




    //fix
     //var a : any = this.spinner.show();
  
var user ={
  "user_id": this.user.user_id
}
  var order = {
    "user_id": user
  }

  this.cartService.createOrder(order).subscribe( (data) =>{
    var myOrder =JSON.parse(JSON.stringify(data));




    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();

 this.cartData.data.forEach( product =>{
  const quantity = product.numInCart;
//      const id_id = product.product.id;
     //const order_id_order_id = order_id;

      var myproduct = {
        "id": product.product.id
      };

      var order_details = {
        "order_id":myOrder,
        "quantity":quantity,
        "id":myproduct,
       // "order_id_order_id":order_id_order_id
      };
      
        this.order_details_list.push(order_details)
 });
 //console.log(this.order_details_list);


      this.cartService.CheckoutFromCart(this.order_details_list).subscribe((data)=>{
        this.spinner.hide();
        this.router.navigateByUrl("/thankyou");
        this.cartService.clearcart(this.cartData.data);
      },(error)=>{
        console.log(error);
        this.spinner.hide();
        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Sorry, failed to book the order`, "Order Status", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      });
    }, 5000);
    this.spinner.show();

   


    
  },(error) =>{
    this.spinner.hide();
  })

     //console.log(this.spinner);

    
    
  
  }



  
}




