import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  constructor( private http : HttpClient) { }

  getAllRestaurants() {
    const restauranturl = 'http://localhost:9000/foodieApp/restaurant/getRestaurant';
    return this.http.get<any>(restauranturl);
  }

  getRestaurantByLocation(location : string) {
    const locationUrl = 'http://localhost:9000/foodieApp/restaurant/restaurant-by-location/';
   return this.http.get<any>(locationUrl+location);
  }

  getAllCuisines() {
    const cuisineUrl = 'http://localhost:9000/foodieApp/cuisine/getAllCuisine';
    return this.http.get<any>(cuisineUrl);
  }
}
