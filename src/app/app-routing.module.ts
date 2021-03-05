import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ProfileGuard } from './guard/profile.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [

{
path: '', component : HomeComponent
},
{
  path: 'product/:id', component: ProductComponent
},

{
  path: 'cart', component: CartComponent
},
{
  path: 'checkout', component: CheckoutComponent
},
{
  path: 'thankyou', component: ThankyouComponent
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'register', component: RegisterComponent
},
{
  path: 'delivery', component: DeliveryComponent
},
{
  path: 'order', component: OrderComponent
},
{
  path: 'profile', component: ProfileComponent, canActivate:[ProfileGuard]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
