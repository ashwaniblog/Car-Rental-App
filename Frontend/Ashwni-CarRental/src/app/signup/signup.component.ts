import { Component , OnInit} from '@angular/core';
import { FormBuilder ,FormGroup , FormControl , Validators , AbstractControl} from '@angular/forms';
import { CarrentalService } from '../carrental.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  addUser = new FormGroup({
    FullName : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required]),
    PhoneNumber : new FormControl(null ,[Validators.required]),
    Password : new FormControl('',[Validators.required]),
    ConfirmPassword : new FormControl('',[Validators.required])
  })

  collection : any = []

  route = "signup"
  constructor(private user:CarrentalService , private loginrouter : Router) {}

  ngOnInit(): void {
  }
  
  CollectUser(){ 
    if(this.addUser?.valid)
    this.user.saveUser(this.addUser.value , this.route).subscribe((result)=>{
      console.warn("result is here",result)
      this.collection = result;
      if(this.collection != null)
      {
        this.addUser.reset()
        this.loginrouter.navigate(['/']);   
      }
      
    })
    else {
      alert("Form Validation Errors");
      this.addUser?.markAllAsTouched();
    } 
    // this.addUser.reset()
    // this.loginrouter.navigate(['/login']);
  }

  get valPhone(): FormControl {
    return this.addUser.get("PhoneNumber") as FormControl;
 }
 get valName(): FormControl{
  return this.addUser.get("FullName") as FormControl;
 }
 get valEmail(): FormControl{
  return this.addUser.get("email") as FormControl;
 }
 get valPassword(): FormControl{
  return this.addUser.get("Password") as FormControl;
 }
 get valConfirmPassword(): FormControl{
  return this.addUser.get("ConfirmPassword") as FormControl;
 }

}
