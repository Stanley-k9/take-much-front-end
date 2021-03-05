import {Injectable} from '@angular/core';
import {ProductService} from "./product.service";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NavigationExtras, Router} from "@angular/router";
import {OrderService} from "./order.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import { cartModelPublic, cartModelsever } from '../models/cart.model';
import { ProductModelSever } from '../models/product.model';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})


export class CartService {

  ServerURL = environment.server_url;
  

  private cartDataClient: cartModelPublic = {prodData: [{incart: 0, id: 0}], total: 0};  // This will be sent to the backend Server as post data
  // Cart Data variable to store the cart information on the server
  private cartDataServer: cartModelsever = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

  cartTotal$ = new BehaviorSubject<Number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<cartModelsever>(this.cartDataServer);


  constructor(private productService: ProductService,
              private orderService: OrderService,
              private httpClient: HttpClient,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);

    let info: cartModelPublic = JSON.parse(localStorage.getItem('cart'));

    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach(p => {
        this.productService.getSingleProducts(p.id).subscribe((actualProdInfo: ProductModelSever) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProdInfo;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProdInfo
            });
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartDataObs$.next({...this.cartDataServer});
        });
      });
    }
  }

  CalculateSubTotal(index): number {
    let subTotal = 0;

    let p = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = p.product.price * p.numInCart;

    return subTotal;
  }

  AddProductToCart(id: number, quantity?: number) {

    this.productService.getSingleProducts(id) .subscribe(prod => {
      // If the cart is empty
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        this.CalculateTotal();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
        this.toast.success(`${prod.title} added to the cart.`, "Product Added", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }  // END of IF
      // Cart is not empty
      else {
        
        let index = this.cartDataServer.data.findIndex(p =>{ 
        
        if(p.product != null || undefined){
          p.product.id === prod.id;
        }
        });

        // 1. If chosen product is already in cart array
        if (index !== -1) {

          if (quantity !== undefined && quantity <= prod.quantity) {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
          } else {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart++ : prod.quantity;
          }


          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          this.toast.info(`${prod.title} quantity updated in the cart.`, "Product Updated", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: 1
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.id
          });
          this.toast.success(`${prod.title} added to the cart.`, "Product Added", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataServer});
      }  // END of ELSE


    });
  }

  UpdateCartData(index, increase: Boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      // @ts-ignore
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next({...this.cartDataServer});
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      // @ts-ignore
      data.numInCart--;

      // @ts-ignore
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index,"");
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
        // @ts-ignore
        this.cartDataObs$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

    }

  }

  DeleteProductFromCart(index,type) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/
if(type =2){
  this.cartDataServer.data.splice(index, 1);
    this.cartDataClient.prodData.splice(index, 1);
    this.CalculateTotal();
    this.cartDataClient.total = this.cartDataServer.total;

    if (this.cartDataClient.total === 0) {
      this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    }

    if (this.cartDataServer.total === 0) {
      this.cartDataServer = {
        data: [{
          product: undefined,
          numInCart: 0
        }],
        total: 0
      };
      this.cartDataObs$.next({...this.cartDataServer});
    } else {
      this.cartDataObs$.next({...this.cartDataServer});
    }
}else{
  if (window.confirm('Are you sure you want to delete the item?')) {
    this.cartDataServer.data.splice(index, 1);
    this.cartDataClient.prodData.splice(index, 1);
    this.CalculateTotal();
    this.cartDataClient.total = this.cartDataServer.total;

    if (this.cartDataClient.total === 0) {
      this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    }

    if (this.cartDataServer.total === 0) {
      this.cartDataServer = {
        data: [{
          product: undefined,
          numInCart: 0
        }],
        total: 0
      };
      this.cartDataObs$.next({...this.cartDataServer});
    } else {
      this.cartDataObs$.next({...this.cartDataServer});
    }
  }
  // If the user doesn't want to delete the product, hits the CANCEL button
  else {
    return;
  }
}
    


  }

  createOrder(order){
    return this.httpClient.post(`${this.ServerURL}/newOrder`,order);
    //.pipe( map( response =>{ response;}) )
  }

  CheckoutFromCart(order_details) {      
      return this.httpClient.post(`${this.ServerURL}/addOrder`,order_details);  
  }


  clearcart(cart){
cart.forEach(products => {
  

  this.DeleteProductFromCart(products.findIndex,2);
});

  }


  private CalculateTotal() {
   // console.log(this.cartDataServer);
    let Total = 0;
    this.cartDataServer.data.forEach(p => {
    // console.log(p);
    if(p.product != null || undefined){
       const {numInCart} = p;
      const {price} = p.product;
      // @ts-ignore


      Total += numInCart * price;
    }
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [{
        product: undefined,
        numInCart: 0
      }],
      total: 0
    };
    this.cartDataObs$.next({...this.cartDataServer});
  }

}

interface OrderConfirmationResponse {
  order_id: number;
  success: Boolean;
  message: String;
  products: [{
    id: String,
    numInCart: String
  }]
}



