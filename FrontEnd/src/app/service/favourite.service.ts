import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FavouriteService implements OnInit{

  constructor(
    private http : HttpClient ,
    private toast : NgToastService) { }

  ngOnInit(): void {
    console.log('fav service')
   console.log(window.localStorage.getItem('tokenKey'))
  }

  getHeader(token : string) {
      return  new HttpHeaders().set('Authorization','Bearer '+token);
    }

//This method will add favourite restautants to the cart
  addRestaurantsToCart(data : any) {
    const restaurantUrl = 'http://localhost:9000/foodieApp/favourites/addFavRestaurant';

    console.log(this.getHeader(window.localStorage.getItem('tokenKey')))
    if(window.localStorage.getItem('tokenKey') == null) {
      this.toast.warning({detail:'please login to add favourites',duration:2000});
    }
    else {
      this.http.post<any>(restaurantUrl, data, { headers: this.getHeader(window.localStorage.getItem('tokenKey')) })
        .subscribe(res => {
          this.toast.success({ detail: 'Added to favourites ', duration: 2000 });
        },
          error => {
            if (error.status == 409) {
              this.toast.warning({ detail: 'Item is already added..', duration: 3000 });
            }
            else {
              this.toast.error({ detail: 'Something went wrong please try after some time', duration: 3000 });
            }
          })}
  }

  //This method will add favourite cuisines to the cart
  addCuisinesToCart(data : any) {
    const cuisineUrl = 'http://localhost:9000/foodieApp/favourites/addFavCuisine';
    if(window.localStorage.getItem('tokenKey') == null) {
      this.toast.warning({detail:'please login to add cart',duration:2000});
    }
    else {
      this.http.post<any>(cuisineUrl, data, { headers: this.getHeader(window.localStorage.getItem('tokenKey')) })
        .subscribe(res => {
          this.toast.success({ detail: 'Added to Cart ', duration: 2000 });
        },
          error => {
            if (error.status == 409) {
              this.toast.warning({ detail: 'Item is already added..', duration: 3000 });
            }
            else {
              this.toast.error({ detail: 'Something went wrong please try after some time', duration: 3000 });
            }
          }
          )
        }
  }

  //This method will get all the  favourite restaurants of the user by user-emailId
  getFavRestaurant():Observable<any> {
    const favRestautantUrl = 'http://localhost:9000/foodieApp/favourites/favRestaurantByEmailId/';
     return this.http.get<any>(favRestautantUrl+window.localStorage.getItem('userEmail'),
      {headers : this.getHeader(window.localStorage.getItem('tokenKey'))})
  }

  //This method will get all the  favourite cuisines of the user by user-emailId
  getFavCuisine():Observable<any> {
    const favCuisineUrl = 'http://localhost:9000/foodieApp/favourites/favCuisineByEmailId/';
      return this.http.get<any>(favCuisineUrl+window.localStorage.getItem('userEmail'),
        {headers : this.getHeader(window.localStorage.getItem('tokenKey'))})
  }

  removeFavRestaurant(restaurantId: any) {
    const deleteUrl = 'http://localhost:9000/foodieApp/favourites/favRestaurant/' + restaurantId;
    return this.http.delete<any>(deleteUrl,
      { headers: this.getHeader(window.localStorage.getItem('tokenKey')) })
      .subscribe(res=>{
          this.toast.success({detail:'Restaurant Deleted..',duration:2000});
        },
      error=>{
        this.toast.warning({detail:'Something went wrong..',duration:2000});
      })
  }

  //To remove the fav cuisine
  removeFavCuisine(cuisineId: any) {
    const deleteUrl = 'http://localhost:9000/foodieApp/favourites/favCuisine/' + cuisineId;
    return this.http.delete<any>(deleteUrl,
      { headers: this.getHeader(window.localStorage.getItem('tokenKey')) })
      .subscribe( res =>{
        this.toast.success({detail:'Cuisine Deleted..',duration:2000});
      },
      error=>{
        console.log(error);
          this.toast.warning({detail:'Something went wrong..',duration:2000});
      })
  }

  deleteAll(userEmail: any){
    return this.http.delete('http://localhost:9000/foodieApp/favourites/deleteCuisine/'+userEmail)
  }
}
