import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../service/restaurant.service';
import { ShareInformationService } from '../../service/share-information.service';
import { FavouriteService } from '../../service/favourite.service';
import { FavouriteRestaurant } from 'src/app/model/favourite-restaurant';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  allRestaurants: any;
  allCuisines: any;
  filterCategory: any;
  searchKey: string = '';

  totalRecords: string;
  totalRecordsByLocation: string;
  page: number = 1;

  restaurantsByLocation: any;
  cuisinesList: any;

  locationText: any;
  searchBarText: string = '';

  disableAll: boolean = true;
  disableLocation: boolean = true;

  constructor(
    private restaurantService: RestaurantService,
    private favouriteService: FavouriteService,
    private shareInformation: ShareInformationService,
    private router: Router ,
    private toast : NgToastService) { }

  ngOnInit(): void {
    this.foodieRestaurants();
    this.searchBarText.toLowerCase()
  }

  selectChangeHandler(event: any) {
    this.locationText = event.target.value;
    console.log(this.locationText);
    this.disableAll = false;
    this.disableLocation = true
  }

  // Method to get all Restaurants
  foodieRestaurants() {
    // this.restaurantService.getAllRestaurants()
    //   .subscribe(res => {
    //     this.allRestaurants = res;
    //     this.totalRecords = res.length
    //     this.disableLocation = false;
    //   },
    //     error => {
    //       console.log(error);
    //     })
    
    this.restaurantService.getRestaurantByLocation(window.localStorage.getItem('location'))
        .subscribe(res => {
          this.restaurantsByLocation = res;
          this.totalRecordsByLocation = res.length;
          console.log(this.restaurantsByLocation);
        },
          error => {
            console.log("No records");
          })
      }
  

  foodieCuisines() {
    this.restaurantService.getAllCuisines()
      .subscribe(res => {
        this.allCuisines = res;
      },
        error => {
          console.log(error);
        })
  }

  //Method to get Restaurants By Location
  getByLocation(location: any) {
    if (location == 'Select') {
      this.foodieRestaurants();
      this.disableAll = true;
    } 
    else if(location == '0'){
      console.log('Entered');
      
       this.restaurantService.getAllRestaurants()
      .subscribe(res => {
        console.log("Calling Service");
        this.restaurantsByLocation = res;
        this.totalRecordsByLocation = res.length;
        // this.allRestaurants = res;
        // this.totalRecords = res.length
        // this.disableLocation = false;
      },
        error => {
          console.log(error);
        })
    }
    else {
      this.restaurantService.getRestaurantByLocation(location)
        .subscribe(res => {
          this.restaurantsByLocation = res;
          this.totalRecordsByLocation = res.length;
          console.log(this.restaurantsByLocation);
        },
          error => {
            console.log("No records");
          })}
  }

  getData(item: any) {
    this.shareInformation.setData(item);
    this.router.navigate(['/restaurantInfo']);
  }

  //add favourites restaurant data
  public favourites: FavouriteRestaurant[];
  addToFavourites(data: any) {
  // const btn = document.getElementById('btn');

  // btn.addEventListener('click', function onClick() {
  //   btn.style.backgroundColor = 'Accent';
  //   btn.style.color = 'white';
  // });
    const id = Math.floor((Math.random() * 100000) + 1);
    this.favourites = [
      new FavouriteRestaurant(
        data.restaurantId = id,
        data.restaurantName,
        data.location,
        data.restaurantImage,
        data.rating,
        window.localStorage.getItem('userEmail'))]
        
    console.log(this.favourites);
    console.log(window.localStorage.getItem('tokenKey'));
    this.favouriteService.addRestaurantsToCart(this.favourites[0]);
  }

  

}
