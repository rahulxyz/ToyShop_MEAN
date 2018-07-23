import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router"
import { DataService } from '../data.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  //default value set to avoid error on component render
  eachToy = [{uniq_id: "1", 
              product_name: "product_name",
              manufacturer: "manufacturer", 
              price: 0, 
              number_available_in_stock: "0"}]
  
  //image's index clicked by user
  productImageIndex:number=0;

  constructor(private dataService: DataService, private router: Router,private activeRoute:ActivatedRoute) { }

  ngOnInit() {
   this.setEachToy();
  }

  //set data of item clicked by user
  setEachToy(){
    this.productImageIndex = this.dataService.getProductImageIndex();
    let id= this.activeRoute.snapshot.paramMap.get('uniq_id')
    this.dataService.getToyById(id)
    .subscribe(data=>{
      this.eachToy = data
    })
   
  }


}
