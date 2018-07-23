import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router"
import { DataService } from '../data.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //contains 9 items of grid on home
  toysHomeGridAll = [];
  //keyword searched by user
  search_keyword: string;
  //path to route to shop on global search 
  pathShopSearchResult: string='/shop/searchResult/';
  //path to product  
  pathProductDetails:string='/productDetails';
  //array to be used for image indexes
  arrayOfRandom=[0,1,2,3,4,5,6,7,8,9];

  constructor(private router: Router, private dataService: DataService) { }


  ngOnInit() {
    this.setToysHomeGridAll();
  }

  //global search by product or manufacturer name
  searchByKeyword(){
    this.router.navigate([this.pathShopSearchResult,this.search_keyword])
  }

  //Fetching home grid items
  setToysHomeGridAll(){
      this.dataService.getToysHomeGrid()
      .subscribe(data=>{
        this.toysHomeGridAll = data
      })    
  }

  //route to product-details page
  getToyById(uniq_id,index){
      this.dataService.setProductImageIndex(index);
      this.router.navigate([this.pathProductDetails,uniq_id])
  }

  //generate random number below max
  getRandomNumber(max){
    return Math.floor(Math.random() * Math.floor(max));
  }


}
