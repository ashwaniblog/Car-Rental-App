import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarrentalService } from '../carrental.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  updateProduct = new FormGroup({
    id : new FormControl(''),
    Car_Name : new FormControl(''),
    Car_Maker : new FormControl(''),
    Car_Category : new FormControl(''),
    Available_Quantity : new FormControl(''),
    Available_Discount : new FormControl(''),
    Image : new FormControl(''),
    Rent_Price : new FormControl(''),
    Status : new FormControl('')
  })

  collection : any = []

  // Token : any;

  route = "getproduct"
  constructor(private product: CarrentalService , private routesnap : ActivatedRoute, private router : Router) {
    // var jsonData = sessionStorage.getItem('username');
    // var retrievedData = JSON.parse(jsonData);
    // var Email = retrievedData.email;
    // var Password = retrievedData.password;
    // this.Token = retrievedData.token;
  }
  
  array:any = []

  answer : any;

  ngOnInit(){
    const id = this.routesnap.snapshot.params['id'];
    this.updateProduct.patchValue({
      id: id
    });
    console.log("id check",this.updateProduct);
    
    this.product.getproduct(this.route).subscribe((result : any)=>{
      this.array = result
      console.log("oNint",this.array); 

      for(let data of this.array) {
        if (id == data.id)
        {
          this.answer = data
        }
      }
      console.log("answer is",this.answer);

      this.updateProduct = new FormGroup({
        id : new FormControl(this.answer.id),
        Car_Name : new FormControl(this.answer.car_Name),
        Car_Maker : new FormControl(this.answer.car_Maker),
        Car_Category : new FormControl(this.answer.car_Category),
        Available_Quantity : new FormControl(this.answer.available_Quantity),
        Available_Discount : new FormControl(this.answer.available_Discount),
        Image : new FormControl(this.answer.image),
        Rent_Price : new FormControl(this.answer.rent_Price),
        Status : new FormControl(this.answer.status)
    })
   })
   
    // console.log("id check", this.updateProduct.value);  
  }

  proroute = "editproduct";

  UpdateProduct(){  
    this.product.updateproduct(this.updateProduct.value , this.proroute).subscribe((result)=>{
      console.warn("result is here",result)
      this.collection = result;
      console.log("check values",this.collection);
      
      if (this.collection != null)
      {
        this.updateProduct.reset();
        this.router.navigate(['/']);
      }
    })
     
  }
}
