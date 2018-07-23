import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router"
import { DataService } from '../data.service'
import { getRandomString } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  //list of toys fetched
  toysList:any = [];
  //list of toys added to cart 
  currentCartList = [];
  //check box list in filter
  checkBoxList =['BachMan','Hornby','Kato','FunkyBuys','Generic']
  //current cart size
  cartSize=0;
  //toggle flag for sort by rate
  rateToggle: number=0;
   //toggle flag for sort by price
  priceToggle: number= 0;
  //price slider vlaue
  priceUpperRange:number=500;
  //rate slider value
  rateUpperRange:number=5;
  //array of random numbers for random images
  arrayOfRandom=[];
  //index of images added to cart by user
  currentImageList=[];

  constructor(private dataService : DataService, private router: Router){

  }

  ngOnInit(){
    this.setRandomArray();
    this.currentCartList = this.dataService.getCartList();
    this.cartSize = this.currentCartList.length;
    //render component as per different url path
      switch(this.router.url.split("?").length){
        case 1:
        this.getAllData();
        break;
        case 2:
        this.getSearchResultList();
        break;
      }

  }

 
  //fetch entire toys list
  getAllData(){
    this.dataService.getToysList()
    .subscribe(data=>{
      this.toysList = data
    })
  }

  //fetch data according to global search
  getSearchResultList(){
    //spliting url by / will give each path
    var array = this.router.url.split("/")
    //split last path by ? so that search keyword is received
    var keyword= array[array.length-1].split("?")[0];
    this.dataService.getByProductOrManufacturer(keyword)
    .subscribe(data=>{
      this.toysList = data;
    })
  }

  //route to product-details
  getToyById(uniq_id,index){
    this.dataService.setProductImageIndex(index);
    this.router.navigate(['/productDetails',uniq_id])
  }

  //Sort by price ascending and descending
  sortByPrice(){
    this.resetRandomArray();
    if(this.priceToggle == 0){
      this.priceToggle=1;
      this.toysList = this.toysList.sort(this.compareByPrice);
    }
    else
    {
        this.priceToggle=0;
        this.toysList = this.toysList.reverse();
    }
  }

  //Sort by rate ascending and descending
  sortByRate(){
    this.resetRandomArray();
    if(this.rateToggle == 0){
      this.rateToggle=1;
      this.toysList = this.toysList.sort(this.compareByRate);
    }
    else
    {
        this.rateToggle=0;
        this.toysList = this.toysList.reverse();
    }

  }

  //compare toys by rate in Ascending
  compareByRate(a,b) {
    if (a.average_review_rating < b.average_review_rating)
      return -1;
    if (a.average_review_rating > b.average_review_rating)
      return 1;
    return 0;
  }

  //compare toys by price in Ascending
  compareByPrice(a,b) {
    if (a.price < b.price)
      return -1;
    if (a.price > b.price)
      return 1;
    return 0;
  }

  //add to uniq_id to cart and index of image clicked
  addToCart(uniq_id,index){
    this.currentCartList.push(uniq_id);
    this.currentImageList.push(index);
    this.dataService.setCartList(this.currentCartList,this.currentImageList);
    this.cartSize=this.currentCartList.length;
  }

  //generate random number below max
  getRandomNumber(max){
    return Math.floor(Math.random() * Math.floor(max));
  }

  //generate 6 random number and set arrayOfRandom
  setRandomArray(){
      for(var i=0;i<=5;i++){
        this.arrayOfRandom.push(this.getRandomNumber(10))
      }
  }

  //reset arrayOfRandom with new numbers
  resetRandomArray(){
    this.arrayOfRandom=[];
    this.setRandomArray();
  }

  //filter data according to user
  filterData(){ 
    this.resetRandomArray();
    var body=this.getMatchJson();
    this.dataService.getFilteredData(body).subscribe(data=>{
      this.toysList=data;
    })
  }

  //get match json as per user's filter
  getMatchJson(){
    var andJson = this.getAndArray();
    var match={$match:{$and:this.getAndArray()}};
    
    return match;
  }

  //to get array of json objects containing filters set by user
  getAndArray(){
    var arrayInAnd:any=[];
    
    arrayInAnd.push({price: {$lte:this.priceUpperRange}});
    arrayInAnd.push({price: {$gte:0}});

    arrayInAnd.push({average_review_rating: {$lte:this.rateUpperRange}});
    arrayInAnd.push({average_review_rating: {$gte:0}});

    var list= this.getCheckedArrayList();
    if(list.length!=0){
      arrayInAnd.push({manufacturer: {$in:this.getCheckedArrayList()}})
    }

    return arrayInAnd;
  }

  //to get an array of items checked by user
  getCheckedArrayList(){
    var checkboxes:any=[]
    checkboxes = document.getElementsByClassName('form-check-input');
    var list=[];
    for(var i=0; i < checkboxes.length;i++){
      if(checkboxes[i].checked){
        list.push(checkboxes[i].value);
      }
    }
    return list;
  }

  p:number = 1;

}
