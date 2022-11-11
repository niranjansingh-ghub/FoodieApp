import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { AdminService } from './../../service/admin.service';
import { Router } from '@angular/router';
import { ShareInformationService } from '../../service/share-information.service';
import { CuisineAdmin } from 'src/app/model/cuisine-admin';
import { RestaurantAdmin } from 'src/app/model/restaurant-admin';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  restaurantForm : FormGroup;

  constructor(
    private restaurantService: RestaurantService,
    private adminService : AdminService,
    private router: Router,
    private shareInformation: ShareInformationService,
    private toast : NgToastService
    ) { }

  public allRestaurants: any;
  totalRecords: string;
  totalRecordsByLocation: string;
  page: number = 1;

  public viewAllRestaurants: boolean = true;
  public viewAddRestaurants: boolean = false;

  ngOnInit(): void {
    this.foodieRestaurants();
    this.restaurantForm=new FormGroup({
      restaurantId : new FormControl(''),
      restaurantName : new FormControl(''),
      location : new FormControl(''),
      restaurantImage : new FormControl(''),
      rating : new FormControl('')
    })
  }

   cuisine : CuisineAdmin=new CuisineAdmin("Cold Coffee","Cold Coffee.jpg",100);
   restaurant : RestaurantAdmin=new RestaurantAdmin(0,"","","",0,this.cuisine);

    saveRestaurant() {
      let restDetails = this.restaurantForm.value;
      restDetails.cuisines = [this.cuisine];
      this.adminService.addRestaurants(restDetails).subscribe(
        (data:any)=>{
          console.log(data);
          this.toast.success({detail:'Restaurant Added Successfully',duration:4000});
          window.location.reload();
        },
        error => {
          console.log(this.restaurantForm.value);
          this.toast.error({detail:'Something Went wrong ..',summary:error,duration:10000});
          this.router.navigate(['/admin']);
        }
        )
      }

  foodieRestaurants() {
    this.restaurantService.getAllRestaurants()
      .subscribe((res) => {
        this.allRestaurants = res;
        this.totalRecords = res.length
        console.log(this.totalRecords)},
        error => {
          console.log(error);
        })}

  openForm() {
    this.viewAddRestaurants = true;
    this.viewAllRestaurants = false;
  }

  closeForm(){
    this.viewAddRestaurants = false;
    this.viewAllRestaurants = true;
  }

  onSubmit() {
    console.log(this.restaurantForm.value);
  }

  deleteRestaurant(restaurantId:any){
    this.adminService.deleteRestaurant(restaurantId).subscribe(
    (item:any)=>{
      console.log(item);
    }
  )
  window.location.reload();
}

 addCuisine(item:any){
    this.shareInformation.setData(item);
    this.router.navigate(['/adminRestaurant']);
  }
}
