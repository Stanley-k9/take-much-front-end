export interface ProductModelSever{

id:number
title:string
short_desk:string
description:string
price:number
quantity:number
picture:string
}

export interface serverResponse{
    count:number
    products:ProductModelSever[]
}
