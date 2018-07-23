import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  //contains indexes of image list of cart data
  currentImageList =[]
  //contains ids of product in cart
  currentCartList=[]
  //details of all products in cart
  cartData: any=[]
  //total bill of user
  totalBill=0;

  constructor(private dataService:DataService) {}

  ngOnInit() {
    this.currentCartList= this.dataService.getCartList();
    this.currentImageList = this.dataService.getCartImageList();
    this.setCartList(this.currentCartList);
  }
  
  //set user's cart list
  setCartList(array){
    var json={"uniq_id_list":array}
    this.dataService.getCartData(json).subscribe(data=>{
      this.cartData= data;
      let sum=0;
      this.cartData.forEach(element => {
        sum+=element.price;
      });
      this.totalBill= Math.round(sum * 100)/100                                                                                                                                                                                                                                 ;
    })


  }

  //generate random number below max
  getRandomNumber(max){
    return Math.floor(Math.random() * Math.floor(max));
  }


}
