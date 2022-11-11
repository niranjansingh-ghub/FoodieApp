import { Component, OnInit } from '@angular/core';
import { FavouriteService } from './../../service/favourite.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  totalRecordsForRestaurant : string;
  totalRecordsForCuisne : string;
  page : number = 1;

 public favRestaurantList : any;
 public favCuisinesList : any;

 restaurantLength : number;
 cuisineLength : number;

 beforeLogin : boolean;
 afterLogin : boolean;

  constructor(
    private favouriteService : FavouriteService ,
    private toast : NgToastService,
    private router: Router) { }

  ngOnInit(): void {

    console.log(window.localStorage.getItem('tokenKey'))
    if(window.localStorage.getItem('tokenKey') == null) {
      this.beforeLogin = true;
    } else {
      this.afterLogin = true;
        this.favouriteService.getFavRestaurant().subscribe(res =>{
        this.favRestaurantList = res;
        this.totalRecordsForRestaurant = res.length;
        this.restaurantLength = this.favRestaurantList.length;
      })
      this.getFavCuisine();
    }
  }

  getFavCuisine() {
    this.favouriteService.getFavCuisine().subscribe(res => {
      this.favCuisinesList = res;
      this.totalRecordsForCuisne = res.length;
      this.cuisineLength = this.favCuisinesList.length;
      console.log(this.cuisineLength)
    })
  }

  // deleteFavRestaurant(id:any) {
  //   this.favouriteService.removeFavRestaurant(id);
  //    window.location.reload();
  // }

  deleteFavCuisine(id: any) {
    this.favouriteService.removeFavCuisine(id);
    window.location.reload();
  }

  placeOrder(){
    if( this.cuisineLength == 0){
      this.toast.error({ detail:'Please add food before placing Order.', duration : 4000}),
      this.router.navigateByUrl('/restaurant')
      }
    else{
      this.favouriteService.deleteAll(window.localStorage.getItem('userEmail')).subscribe(
        (item:any)=>{
          console.log(item);
        }
      )
       alert('Your Order has been placed successfully. Your food will reach you Shortly ')
      //this.toast.success({ detail: 'Your Order has been placed successfully. Your food will reach you Shortly ', duration: 4000 });
      window.location.reload();
    }

  }

}
