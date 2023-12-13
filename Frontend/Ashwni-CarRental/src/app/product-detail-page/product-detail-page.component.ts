import { Component,OnInit } from '@angular/core';
import { CarrentalService } from '../carrental.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {

  rentCar = new FormGroup({
    id : new FormControl(''),
    Car_Name : new FormControl(''),
    Car_Maker : new FormControl(''),
    Start_Date : new FormControl(''),
    End_Date : new FormControl(''),
    Rent_Price : new FormControl(''),
    Status : new FormControl('')
  })

  recievedcollectiondata: any = []

  route = "getproduct"

  // icon = faCartShopping;

  isLoggedin : any ;

  email : any;

  // postCartCollectionId : any ;

  cart = "addcart"

  currentDate: Date;

  showstartDate : any = "";

  totalDays : any = "";

  totalPrice : any;

  constructor(private service: CarrentalService, private router: ActivatedRoute , private rentrouter : Router) { 
    this.isLoggedin= sessionStorage.getItem('username')!=null;
    console.log("login",this.isLoggedin);
    // var jsonData = sessionStorage.getItem('username');
    // var retrievedData = JSON.parse(jsonData);
    // var Email = retrievedData.email;
    // var Password = retrievedData.password;
    // this.Token = retrievedData.token;
    
    if (this.isLoggedin)
    {
    const sessionData = sessionStorage.getItem('username');

    const parsedData = JSON.parse(sessionData);
     
    this.email = parsedData.email;
    }
  }
  
  answer : any;

  img : any;

  fixedperdayrent : any;

  ngOnInit(): void {
    this.getDate()
    this.calculateTotal()
    const id = this.router.snapshot.params['id'];
    this.rentCar.patchValue({
      id: id
    });
    console.log("cid", id)
    this.service.getproduct(this.route).subscribe((result: any) => {
      this.recievedcollectiondata = result
      console.log("revieced collection data", this.recievedcollectiondata);
      for(let data of this.recievedcollectiondata) {
        if (id == data.id)
        {
          this.answer = data
          this.img = data.image
          this.fixedperdayrent = data.rent_Price
        }
        
      }
      console.warn("get product call", this.answer)
      this.rentCar = new FormGroup({
        id : new FormControl(this.answer.id),
        Car_Name : new FormControl(this.answer.car_Name),
        Car_Maker : new FormControl(this.answer.car_Maker),
        Start_Date : new FormControl(this.showstartDate),
        End_Date : new FormControl(),
        Rent_Price : new FormControl(this.totalPrice),
        Status : new FormControl(this.answer.status)
      })
      this.rentCar.get('Car_Name').disable();
      this.rentCar.get('Car_Maker').disable();
      this.rentCar.get('Start_Date').disable();
      this.rentCar.get('Rent_Price').disable();
      this.rentCar.get('Status').disable();      
    })
  }

  getDate(){
    var date:any=new Date();
    var tdate:any=date.getDate();
    if(tdate<10){
      tdate="0"+tdate;
    }
    var month:any=date.getMonth()+1;
    if(month<10){
      month='0'+month;
    }
    var year=date.getFullYear();
    this.showstartDate=year+"-"+month+"-"+tdate;
    // console.log(this.minDate);
    //this.minDate=tdate+"-"+month+"-"+year;
    console.log(this.showstartDate);
  }
  
  calculateTotal() {
    const endDateModified=new Date(this.rentCar.value.End_Date);
    console.log("my endDateModified is",endDateModified); 

    const startDateModified=new Date(this.showstartDate);
    console.log("my startDateModified is",startDateModified);
    //Jan 1, 1970
    const Time=endDateModified.getTime()-startDateModified.getTime();
    //in days
    this.totalDays=Math.ceil(Time/(1000 * 3600 *24));
    console.log("my date is",this.totalDays); 
    //price
    const rentalPrice = this.fixedperdayrent; // Use the car's price from the fetched data
    this.totalPrice = this.totalDays * rentalPrice;
    console.log("my price is",this.totalPrice,typeof(this.totalPrice));   
  }

  sendData() {
    const requestBody = {
      CarId : this.answer.id,
      UserEmail: this.email,
      StartDate :this.showstartDate,
      EndDate :this.rentCar.value.End_Date,
      RentPrice : this.totalPrice,
      isReturned : false ,
      isOrderConfirmed : false
    }
    console.log("my body",requestBody);
    
    // console.log("sender function",this.service.cartdata);
    
    this.service.saveCart(requestBody, this.cart).subscribe((result : any)=>{

    console.warn("add cart result",result)
    this.rentrouter.navigate(['/']);      
    })
  }
}
