import { Component, OnInit } from '@angular/core';
import { CarrentalService } from '../carrental.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-rental-orders',
  templateUrl: './rental-orders.component.html',
  styleUrls: ['./rental-orders.component.css']
})
export class RentalOrdersComponent implements OnInit {
  route = "getcartorder"

  productroute = "getproduct"

  CartOrdercollection : any =[]

  productCollection : any =[]

  resultant : any = []

  showAlert :boolean = false;

  constructor(private getCart : CarrentalService , private router : Router) {

  }

  
  ngOnInit(): void {

    var jsonData = sessionStorage.getItem('username');
    const email = JSON.parse(jsonData)?.email;

    setTimeout(() => {
      this.getCart.getcartproduct(this.route).subscribe((result : any) =>{
        console.log("cart data", result);
        result.forEach((element : any) => {
          if (element.isOrderConfirmed && element.userEmail == email)
          {
            this.CartOrdercollection.push(element);
            console.log("rental orders is",element);
          }
        });
                  
      });
    }, 500);

    // console.log("cart order collection",this.CartOrdercollection);

    setTimeout(() => {
      this.getCart.getproduct(this.productroute).subscribe((result : any) =>{
        console.log("get product",result);
        result.forEach((element : any) => {
          this.CartOrdercollection.forEach((object : any) => {
              if(object.carId == element.id)
              {
                this.productCollection.push(element);
                console.log("check",this.productCollection);
              }
          });
        });
      });
    }, 800);
    
    // console.log("product collection ",this.productCollection);

    setTimeout(()=>{ 
      for (let index = 0; index < this.productCollection.length; index++) {
        console.log("product collection ",this.productCollection);
        for (let x = 0; x < this.CartOrdercollection.length; x++) {
          console.log("cart order collection",this.CartOrdercollection);
            if (this.productCollection[index].id == this.CartOrdercollection[x].carId)
            {
              this.resultant.push({
                car_Name : this.productCollection[index].car_Name,
                image : this.productCollection[index].image,
                rental_Price : this.CartOrdercollection[x].rentPrice,
                startDate : this.CartOrdercollection[x].startDate,
                endDate : this.CartOrdercollection[x].endDate,
                carId : this.CartOrdercollection[x].id
              })
            }
        }  
      }
      console.log("answer",this.resultant);
    },1000)

    // console.log("product collection ",this.productCollection);
    // console.log("cart order collection",this.CartOrdercollection);

    console.log("my obj",this.productCollection);

    // console.log("my resultant array",resultant);
  }
  Returnreq(id: any) {
    const requestBody = {
      id: id,
      isOrderConfirmed: true, 
      isReturned: true
    }
    this.getCart.updatecart(requestBody).subscribe((result: any) => {
      console.log("after update", result);
      this.router.navigate(['/']);
    });
  }
}
