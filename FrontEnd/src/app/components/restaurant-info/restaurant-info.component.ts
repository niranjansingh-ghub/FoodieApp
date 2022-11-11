import { Component, OnInit } from '@angular/core';
import { ShareInformationService } from '../../service/share-information.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FavouriteService } from './../../service/favourite.service';
import { FavouriteCuisine } from './../../model/favourite-cuisine';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})

export class RestaurantInfoComponent implements OnInit {
   restauratantInfo : any ;

  constructor(
    private favouriteService : FavouriteService ,
    private shareRestautant : ShareInformationService ,
    private router : Router,
    private toast : NgToastService) { }

  ngOnInit(): void {
   this.restauratantInfo = this.shareRestautant.getData();
   console.log(this.restauratantInfo);
   if(this.restauratantInfo == undefined)
     {
      this.restauratantInfo = '';
      this.router.navigate(['/restaurant']);
     }
  }

  public favourites: FavouriteCuisine[];
  addFavCuisine(data: any) {
    const id = Math.floor((Math.random() * 10000) + 1);
    this.favourites = [
      new FavouriteCuisine(
        data.cuisineId = id,
        data.cuisineName,
        data.cuisineImage,
        window.localStorage.getItem('userEmail'),
        data.price)]
        // this.router.navigate(['/admin']);

    console.log(this.favourites);
    this.favouriteService.addCuisinesToCart(this.favourites[0]);
  }
}
