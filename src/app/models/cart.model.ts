import { NgModule } from "@angular/core";
import { ProductModelSever } from "./product.model";

export interface cartModelsever{

    total : number
    data:[{
      product: ProductModelSever,
      numInCart: number

    }];

}

export interface cartModelPublic{

total: number
prodData:[{

    id : number
    incart: number
}];
}