import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  //contact us form's data
  contactUs ={
    name:'',
    email:'',
    review:''
  }

  constructor(private dataService:DataService) { }

  ngOnInit() {
  }


  //insert user data into database
  setUserDetails(){
    this.dataService.insertIntoUsers(this.contactUs)
      .subscribe(data=>{

        if(data.inserted==0){
        var data:any= document.getElementsByClassName('formFail')[0];
          data.style.visibility = 'visible';
        }
        else{
          var data:any= document.getElementsByClassName('formSuccess')[0];
          data.style.visibility = 'visible';   
        }

        this.contactUs.name='';
        this.contactUs.review='';
        this.contactUs.email=''
      })
  }


}
