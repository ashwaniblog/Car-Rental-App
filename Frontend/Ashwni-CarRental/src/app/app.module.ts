import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductLandingPageComponent } from './product-landing-page/product-landing-page.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { RentalOrdersComponent } from './rental-orders/rental-orders.component';
import { AllRentalAgreementComponent } from './all-rental-agreement/all-rental-agreement.component';
import { EditRentalAgreementComponent } from './edit-rental-agreement/edit-rental-agreement.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    AddProductComponent,
    ProductLandingPageComponent,
    UpdateProductComponent,
    ProductDetailPageComponent,
    AddToCartComponent,
    RentalOrdersComponent,
    AllRentalAgreementComponent,
    EditRentalAgreementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
