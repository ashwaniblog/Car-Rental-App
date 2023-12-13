import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarrentalService } from '../carrental.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor (private route : Router, private service : CarrentalService) {
    // var jsonData = sessionStorage.getItem('username');
    
    // var retrievedData = JSON.parse(jsonData);
    // var Email = retrievedData.email;
    // var Password = retrievedData.password;
    // var Token = retrievedData.token;
    this.isLoggedIn= sessionStorage.getItem('username')!=null;
    console.log("login",this.isLoggedIn);
    
    const username = sessionStorage.getItem('username');
    if (username) {
      const userData = JSON.parse(username);
      this.email = userData.email;
    }
  }

  email : any;
  
  isLoggedIn: any;
  logout(){
    this.service.logoutuser().subscribe((result : any)=>{
      console.log("logout",result);
    })
    sessionStorage.clear();
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    console.log(this.isLoggedIn);
  }
}
