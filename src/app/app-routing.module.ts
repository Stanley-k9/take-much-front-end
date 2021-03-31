import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './admin/products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './guard/admin.guard';
import { ProfileGuard } from './guard/profile.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { UsersComponent } from './users/users.component';

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
  path: 'order', component: OrderComponent
},
{
  path: 'profile', component: ProfileComponent, canActivate:[ProfileGuard]
},
{
  path: 'products',component: AdminComponent,canActivate:[AdminGuard]
},
{
  path: 'admin/products',component: ProductsComponent,canActivate:[AdminGuard]
},
{
  path: "dashboard",component: DashboardComponent,canActivate:[AdminGuard]
},
{
  path : "users", component: UsersComponent,canActivate:[AdminGuard]
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
