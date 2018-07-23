import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //base url of website
  baseUrl: string = 'http://localhost:3000';
  //url path of home page
  pathHome: string = "/home";
  //url path of contactUs
  pathContactUs: string = "/contactUs/";
  //url path of product
  pathProductDetails: string = "/productDetails/";
  //url path of shop on global search
  pathShop: string = '/shop/searchResult/';
  //url path of shop on applying filter
  pathShopFilter: string = '/shop/filteredResult/';
  //url path of cart 
  pathCartDetail: string = '/cart/detail/'
  //list of toys of user in cart
  cartList = [];
  //list of image's indexesof toys
  cartImageList=[];
  //current image index selected by user
  productImageIndex:number=0;

  constructor(private http: HttpClient) { }

  //search by product name or manufacturer name
  getByProductOrManufacturer(keyword){
    return this.http.get<any>(this.baseUrl+this.pathShop+keyword);
  }

  //insert data into users collection
  insertIntoUsers(user){
    return this.http.get<any>(this.baseUrl+ this.pathContactUs+user.name+"/"+user.email+"/"+user.review);
  }  

  //To fetch 9 records to display in home grid
  getToysHomeGrid(){
    return this.http.get<any>(this.baseUrl+this.pathHome);
   }

   //To fetch one toy's data as clicked by user
  getToyById(id){
    return this.http.get<any>(this.baseUrl+ this.pathProductDetails +id);
  }

  //To fetch entire toys list
  getToysList(){
    return this.http.get<any>(this.baseUrl);
  }

  //setup user's cart with data and images
  setCartList(cartArray,imageArray){
    this.cartList= cartArray;
    this.cartImageList = imageArray;
  }

  //return list of toys in user's cart
  getCartList(){
    return this.cartList;
  }

   //return list of toys' images in user's cart
  getCartImageList(){
    return this.cartImageList;
  }

  //routes to user's cart 
  getCartData(body){ 
    return this.http.post(this.baseUrl+this.pathCartDetail,body);  
  }

  //set image index as selected by user
  setProductImageIndex(index){
    this.productImageIndex = index;
  }

  //fetch image index as selected by user
  getProductImageIndex(){
    return this.productImageIndex;
  }
 
  //fetch filtered data
  getFilteredData(body){
    return this.http.post(this.baseUrl+this.pathShopFilter,body);
  }

}
