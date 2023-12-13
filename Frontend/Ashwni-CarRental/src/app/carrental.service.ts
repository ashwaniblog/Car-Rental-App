import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CarrentalService {

  urlacc = "https://localhost:44388/api/account"
  urlpro = "https://localhost:44388/api/product"
  urlcart = "https://localhost:44388/api/order"

  collection : any = [];

  cartdata : any ;

  // headers = new HttpHeaders()
  //   .set("Authorization" , `Bearer ${localStorage.getItem('token')}`)

  // private authToken = localStorage.getItem('token');

  constructor(private http : HttpClient) { }

  saveUser(data:any , signup:any){
    console.log("data is",data)
    // console.log(typeof(data))
    return this.http.post(`${this.urlacc}/${signup}`,data)
  }
  loginUser(data : any , signin:any){
    console.log("log in data",data);
    return this.http.post(`${this.urlacc}/${signin}`,data)
  }

  logoutuser(){
    return this.http.get(`${this.urlacc}/signout`)
  }

  addproducts(data : any , addproduct : any ){
    console.log("my auth toke",localStorage.getItem('token'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token').toString()
    });
    console.log("product headers is"+ headers);
    return this.http.post(`${this.urlpro}/${addproduct}`,data , {headers})
  }

  getproduct(getproduct : any ){ 
    this.collection = this.http.get(`${this.urlpro}/${getproduct}`)
    // console.log("data from backend is",this.collection);
    return this.collection;
  }
  
  updateproduct(data : any , route : any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token').toString()
    });
    console.log("update data", data);
    return this.http.put(`${this.urlpro}/${route}`,data , {headers})
  }
  
  deleteProduct(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    return this.http.delete(`https://localhost:44388/api/product/deleteproduct/${id}` , {headers})
  }

  saveCart(data:any , addcart : any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    console.log("my data is",data,"cart is:",addcart)
    return this.http.post(`${this.urlcart}/${addcart}`,data , {headers})
  }

  getcartproduct(getcartproduct : any ){ 
    this.collection = this.http.get(`${this.urlcart}/${getcartproduct}`)
    // console.log("data from backend is",this.collection);
    return this.collection;
  }

  getallrentalagreement(rentalagreement : any ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    }); 
    this.collection = this.http.get(`${this.urlcart}/${rentalagreement}` , {headers})
    // console.log("data from backend is",this.collection);
    return this.collection;
  }

  updatecart(data : any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token').toString()
    });
    console.log("update data", data);
    return this.http.put(`${this.urlcart}/editcart`,data , {headers})
  }

  updaterentalagreement(data : any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token').toString()
    });
    console.log("update data", data);
    return this.http.put(`${this.urlcart}/editrentalagreement`,data , {headers})
  }

  deleteCart(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    return this.http.delete(`https://localhost:44388/api/order/deletecartproduct/${id}` , {headers})
  }

  isavailable(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    return this.http.get(`https://localhost:44388/api/order/isavailable/${id}` , {headers})
  }

}
