import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarrentalService } from '../carrental.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-rental-agreement',
  templateUrl: './edit-rental-agreement.component.html',
  styleUrls: ['./edit-rental-agreement.component.css']
})
export class EditRentalAgreementComponent implements OnInit{
  rentCar = new FormGroup({
    id : new FormControl(''),
    Car_Name : new FormControl(''),
    Start_Date : new FormControl(''),
    End_Date : new FormControl(''),
    Rent_Price : new FormControl('')
  })

  receivedData: any = []

  Caridfetch: any = []

  route = "getrentalagreement"

  isReturnedCheck : boolean;

  totalDays : any = "";

  totalPrice : any;

  constructor(private service: CarrentalService, private routesnap: ActivatedRoute , private router : Router) {
    
    
  }

  ngOnInit(){
    var jsonData = sessionStorage.getItem('username');
    const email = JSON.parse(jsonData)?.email;
    console.log("email is", email);
    const id = this.routesnap.snapshot.params['id'];

    console.log("my id check is",id);
    

    this.service.getallrentalagreement(this.route).subscribe((result: any) => {
      result.forEach((element: any) => {
        if (id == element.id) {
          this.receivedData = element;
        }
      });
      console.log("my data is",this.receivedData);
      this.rentCar = new FormGroup({
        id : new FormControl(this.receivedData.id),
        Car_Name : new FormControl(this.receivedData.car_Name),
        Start_Date : new FormControl(this.receivedData.startDate),
        End_Date : new FormControl(this.receivedData.endDate),
        Rent_Price : new FormControl(this.totalPrice)
    })
      this.rentCar.get('Car_Name').disable();
      this.rentCar.get('Start_Date').disable();
    })
    
  }
  calculateTotal() {
    const endDateModified = new Date(this.rentCar.value.End_Date);
    console.log("my endDateModified is", endDateModified);

    const startDateModified = new Date(this.receivedData.startDate);
    console.log("my startDateModified is", startDateModified);
    //Jan 1, 1970
    const Time = endDateModified.getTime() - startDateModified.getTime();
    //in days
    this.totalDays = Math.ceil(Time / (1000 * 3600 * 24));
    console.log("my date is", this.totalDays);
    //price
    const rentalPrice = this.receivedData.rent_Price; // Use the car's price from the fetched data
    this.totalPrice = this.totalDays * rentalPrice;
    console.log("my price is", this.totalPrice, typeof (this.totalPrice));
  }



  sendData() {
    const updateId = this.receivedData.id
    console.log("id recieved",updateId);
    
    const reqBody = {
      id : updateId,
      rentPrice : this.totalPrice,
      endDate : this.rentCar.value.End_Date,
    }
    console.log("my val",reqBody);
    
    this.service.updaterentalagreement(reqBody).subscribe((result: any) => {
      console.log("update", result);
      this.router.navigate(['/addcart']);
    });
    
  }

}
