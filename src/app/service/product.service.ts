import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModelSever, serverResponse } from '../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private server_url = environment.server_url;
  constructor( private http: HttpClient) { 
  }



  /*get all products from back end*/
getAllProducts(numberOfResults: number) : Observable<serverResponse>{
          return this.http.get<serverResponse>(`${this.server_url}/products/${numberOfResults}`,{
         params:{
         limit: numberOfResults.toString()
            }
        });
  }

  /*get single products from back end*/
  getSingleProducts(id: number) : Observable<ProductModelSever>{
    return this.http.get<ProductModelSever>(`${this.server_url}/productById/${id}`);
}
/*get products per cat*/

getProductsOfCat(catName : string) : Observable<ProductModelSever[]>{
  return this.http.get<ProductModelSever[]>(`${this.server_url}/getProductByCat/${catName}`);

  }
}