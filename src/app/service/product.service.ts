import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductModelSever, serverResponse } from '../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private server_url = environment.server_url;
  httpClient: any;
  constructor( private http: HttpClient,
    private toast: ToastrService) { 
  }



  /*get all products from back end*/
getAllProducts() : Observable<serverResponse>{
          return this.http.get<serverResponse>(`${this.server_url}/products`);
  }

noOfProducts(){
  return this.http.get<any>(`${this.server_url}/numberOfProducts`);
}

sales(){

  return this.http.get<any>(`${this.server_url}/sales`)
}


  /*get all categories */

getAllCategories():Observable<serverResponse>{

  return this.http.get<serverResponse>(`${this.server_url}/categories`)
}


  /*get single products from back end*/
  getSingleProducts(id: number) : Observable<ProductModelSever>{
    return this.http.get<ProductModelSever>(`${this.server_url}/productById/${id}`);
}
/*get products per cat*/

getProductsOfCat(catName : string) : Observable<ProductModelSever[]>{
  return this.http.get<ProductModelSever[]>(`${this.server_url}/getProductByCat/${catName}`);

  }

  addProducts(product){

    return this.http.post(`${this.server_url}/addProduct`,product)
    .pipe(map(response=> response));
  }
  

updateProduct(product){

  return this.http.put(`${this.server_url}/updateProduct`,product)
}

  deleteProduct(id : number){

    return this.http.delete(`${this.server_url}/deleteProduct/${id}`),
    this.toast.error(`deleted product ${id}`, "sucessfully", {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    }),(error)=>{
    this.toast.error(`deleted product `, "unsucessfully", {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    })
  
  }
}
}