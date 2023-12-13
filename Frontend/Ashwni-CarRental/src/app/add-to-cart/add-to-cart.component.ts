import { Component , OnInit} from '@angular/core';
import { CarrentalService } from '../carrental.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  addCartdata: any = []

  receivedData: any = []

  Caridfetch: any = []

  route = "getproduct"

  cartroute = "getcartorder"

  placeorder: any = []

  isChecked: boolean;

  showAlert :boolean = false;

  constructor(private service: CarrentalService, private router: Router) {
    
    
  }

  ngOnInit(): void {
    this.placeorder.splice(0,this.placeorder.length)
    console.log("check placeorder Ashwnai",this.placeorder );
    var jsonData = sessionStorage.getItem('username');
    const email = JSON.parse(jsonData)?.email;

    console.log("email is", email);

    setTimeout(() => {
      this.service.getcartproduct(this.cartroute).subscribe((result: any) => {
        //console.log("cart data", result);
        // this.placeorder = result;
        //console.log("place order details", this.placeorder);
        result.forEach((element: any) => {
          if (email === element.userEmail && !element.isOrderConfirmed) {
            console.log("my email",element.userEmail);
            this.placeorder.push(element);
            console.log("id check",element.carId);
            this.pushUniqueValue(element.carId);
          }
        });
      })
    }, 200);

    setTimeout(() => {
      this.service.getproduct(this.route).subscribe((result: any) => {
        console.warn("get product call", this.placeorder)
        result.forEach((object: any) => {
          for (let index = 0; index < this.Caridfetch.length; index++) {
            if (this.Caridfetch[index] == object.id) {
              this.addCartdata.push(object);
            }
          }
        });
      })
    }, 400);

    setTimeout(() => {
      for (let i = 0; i < this.placeorder.length; i++) {
        const order = this.placeorder[i];
        for (let j = 0; j < this.addCartdata.length; j++) {
          const item = this.addCartdata[j];
          if (order.carId === item.id) {
            order.car_Name = item.car_Name;
            order.image = item.image;
            break; // Once matched, break the inner loop
          }
        }
      }       
    }, 600);
    

    console.log("cart data count ",this.placeorder);
  }
  
  pushUniqueValue(idval: any) {
    if (!this.Caridfetch.includes(idval)) {
      this.Caridfetch.push(idval);
      console.log("Added to the uniqueArray.", this.Caridfetch);
    } 
  }

  PlaceOrder(id: any) {
    const requestBody = {
      id: id,
      isOrderConfirmed: true,
      isReturned : false
    }
    console.log("place order",requestBody);
    this.service.updatecart(requestBody).subscribe((result: any) => {
      console.log("after update", result);
      this.showAlert = !this.showAlert;
    });
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
  DeleteOrder(id: any) {
    console.log("id recieved",id);
    this.service.deleteCart(id).subscribe((result: any) => {
      console.log("after delete", result);
      // this.showAlert = !this.showAlert;
    });
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
}