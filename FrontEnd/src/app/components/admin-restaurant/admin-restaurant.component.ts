import { Component, OnInit } from '@angular/core';
import { ShareInformationService } from '../../service/share-information.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FavouriteService } from './../../service/favourite.service';
import { FavouriteCuisine } from './../../model/favourite-cuisine';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../../service/admin.service';
import { CuisineAdmin } from 'src/app/model/cuisine-admin';

@Component({
  selector: 'app-admin-restaurant',
  templateUrl: './admin-restaurant.component.html',
  styleUrls: ['./admin-restaurant.component.css']
})
export class AdminRestaurantComponent implements OnInit {

  restauratantInfo : any ;
  cuisineForm : FormGroup;

  // cuisine : CuisineAdmin;

  constructor(
    private shareRestautant : ShareInformationService ,
    private router : Router,
    private toast : NgToastService,
    private adminService : AdminService
    ) { }

  ngOnInit(): void {
   this.restauratantInfo = this.shareRestautant.getData();
   console.log(this.restauratantInfo);
  //  if(this.restauratantInfo == undefined)
  //    {
  //     this.restauratantInfo = '';
  //     this.router.navigate(['/restaurant']);
  //    }
     this.cuisineForm = new FormGroup({
      cuisineName:new FormControl('',Validators.required),
      cuisineImage:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required)
    });
  }


  removeCuisine(restaurantId: any, cuisineName: any){this.adminService.deleteCuisine(restaurantId,cuisineName).subscribe(
    (data:any)=>{
      console.log(data);
      this.toast.success({detail:'Food Item Deleted Successfully',duration:4000});
      this.router.navigate(['/admin']);
    }
  );
  }

  addCuisine(restaurantId: any){
    console.log(this.cuisineForm.value);
    this.adminService.addCuisine(restaurantId,this.cuisineForm.value).subscribe(
      (data:any)=>{
        console.log(data);
        console.log("Cusine added");
        this.toast.success({detail:'Food Item Added Successfully',duration:4000});
        this.router.navigate(['/admin']);
        // this.router.navigate(['/admin'])
      }
    );
  }

}
