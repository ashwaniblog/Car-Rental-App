import { Component, OnInit } from '@angular/core';
import { CarrentalService } from '../carrental.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-rental-agreement',
  templateUrl: './all-rental-agreement.component.html',
  styleUrls: ['./all-rental-agreement.component.css']
})
export class AllRentalAgreementComponent implements OnInit{


  receivedData: any = []

  Caridfetch: any = []

  route = "getrentalagreement"

  isReturnedCheck : boolean;

  deleting : any;


  constructor(private service: CarrentalService, private router: Router) {
    
    
  }

  ngOnInit(): void {
    var jsonData = sessionStorage.getItem('username');
    const email = JSON.parse(jsonData)?.email;
    console.log("email is", email);

    this.service.getallrentalagreement(this.route).subscribe((result: any) => {
      this.receivedData = result;
      this.isReturnedCheck = true;
      console.log("my data is",this.receivedData);
        
      // result.forEach((element: any) => {
      //     this.receivedData.push(element);
      //     console.log("Values",element);
      //     // this.pushUniqueValue(element.carId);
      // });
    })
  }
  
  // pushUniqueValue(idval: any) {
  //   if (!this.Caridfetch.includes(idval)) {
  //     this.Caridfetch.push(idval);
  //     console.log("Added to the uniqueArray.", this.Caridfetch);
  //   } 
  // }

  deleteAgreement(id: any) {
    this.deleting = true;
    console.log("id recieved",id);
    
    this.service.deleteCart(id).subscribe((result: any) => {
      console.log("after delete", result);
      // this.showAlert = !this.showAlert;
    });
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}
