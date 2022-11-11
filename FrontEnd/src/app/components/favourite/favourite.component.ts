import { Component, OnInit } from '@angular/core';
import { FavouriteService } from './../../service/favourite.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  totalRecordsForRestaurant : string;
  totalRecordsForCuisne : string;
  page : number = 1;

 public favRestaurantList : any;
 public favCuisinesList : any;

 restaurantLength : number;
 //cuisineLength : number;

 beforeLogin : boolean;
 afterLogin : boolean;

  constructor(
    private favouriteService : FavouriteService ,
    private taost : NgToastService) { }

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
      //this.getFavCuisine();
    }
  }

  // getFavCuisine() {
  //   this.favouriteService.getFavCuisine().subscribe(res => {
  //     this.favCuisinesList = res;
  //     this.totalRecordsForCuisne = res.length;
  //     this.cuisineLength = this.favCuisinesList.length;
  //     console.log(this.cuisineLength)
  //   })
  // }

  deleteFavRestaurant(id:any) {
    this.favouriteService.removeFavRestaurant(id);
     window.location.reload();
  }

  // deleteFavCuisine(id: any) {
  //   this.favouriteService.removeFavCuisine(id);
  //   window.location.reload();
  // }
}
