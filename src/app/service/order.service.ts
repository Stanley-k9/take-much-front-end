import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products:productResponceModel[] = []
  private Server_url = environment.server_url

  constructor(private http : HttpClient) { }


getSingleOrder(orderId : any){
return this.http.get<productResponceModel[]>(this.Server_url + '/ordersById/' + orderId).toPromise();
  }




getOrders(){
  return this.http.get<any>(this.Server_url + '/orderDetails');
    }

    allOrders(){
      return this.http.get<any>(`${this.Server_url}/allOrders`);
    }



    getMyOrders(order_Id : any){
      return this.http.get<any>(this.Server_url + '/myOrders/' + order_Id);
        }
        

        updateStatus(orderDetails){
          return this.http.post(`${this.Server_url}/updateStatus`,orderDetails);
        }
  }
  
  

interface productResponceModel{

  id: number
  title:string
  discription:string
  price:number
  quantity:number
  pricture:string




}