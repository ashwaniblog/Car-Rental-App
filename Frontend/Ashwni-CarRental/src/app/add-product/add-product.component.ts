import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarrentalService } from '../carrental.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  addProduct = new FormGroup({
    Car_Name: new FormControl('',[Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9]+$')]),
    Car_Maker: new FormControl('',[Validators.required, Validators.maxLength(255), Validators.pattern('^[a-zA-Z0-9]+$')]),
    Car_Category: new FormControl('',[Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9]+$')]),
    Available_Quantity: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$')]),
    Available_Discount: new FormControl('',[Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    Image: new FormControl(''),
    Rent_Price: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
    Status: new FormControl('')
  })

  collection: any = []

  route = "addproduct"



  constructor(private product: CarrentalService, private loginrouter: Router) { }

  ngOnInit(): void { }

  AddProduct() {
    if (this.addProduct?.valid)
    {
      this.product.addproducts(this.addProduct.value, this.route).subscribe((result) => {
        console.warn("result is here", result)
        this.collection = result
        // sessionStorage.setItem('token',result.token)
        console.log("collection values", this.collection)
        if (this.collection != null) {
          this.addProduct.reset();
          this.loginrouter.navigate(['/']);
        }
      })
    }
    else {
      alert("Form Validation Errors");
      this.addProduct?.markAllAsTouched();
    }  
    // this.addProduct.reset();

    // this.loginrouter.navigate(['/']);
  }
  get product_Name(): FormControl {
    return this.addProduct.get('Car_Name') as FormControl;
  }

  get product_Description(): FormControl {
    return this.addProduct.get('Car_Maker') as FormControl;
  }

  get product_Category(): FormControl {
    return this.addProduct.get('Car_Category') as FormControl;
  }

  get available_Quantity(): FormControl {
    return this.addProduct.get('Available_Quantity') as FormControl;
  }

  get image(): FormControl {
    return this.addProduct.get('Image') as FormControl;
  }

  get available_Price(): FormControl {
    return this.addProduct.get('Rent_Price') as FormControl;
  }

  get available_Discount(): FormControl {
    return this.addProduct.get('Available_Discount') as FormControl;
  }

  get specification(): FormControl {
    return this.addProduct.get('Status') as FormControl;
  }
}
