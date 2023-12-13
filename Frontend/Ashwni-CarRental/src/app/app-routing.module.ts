import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { RentalOrdersComponent } from './rental-orders/rental-orders.component';
import { AllRentalAgreementComponent } from './all-rental-agreement/all-rental-agreement.component';
import { EditRentalAgreementComponent } from './edit-rental-agreement/edit-rental-agreement.component';

const routes: Routes = [
  {
    component : HomeComponent,
    path :""
  },
  {
    component : SignupComponent,
    path : "signup"
  },
  {
    component : LoginComponent,
    path : "login"
  },
  {
    component : AddProductComponent,
    path : "addproduct"
  },
  {
    component : UpdateProductComponent,
    path : "updateproduct/:id"
  },
  {
    component : ProductDetailPageComponent,
    path : "viewdetails/:id"
  },
  {
    component : AddToCartComponent,
    path : "addcart"
  },
  {
    component : RentalOrdersComponent,
    path : "myorders"
  },
  {
    component : AllRentalAgreementComponent,
    path : "rentalagreement"
  },
  {
    component : EditRentalAgreementComponent,
    path : "editagreement/:id"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
