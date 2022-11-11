export class FavouriteRestaurant {
    public restaurantId : number;
    public restaurantName : string ;
    public location : string ;
    public restaurantImage : string ;
    public rating : string ;
    public emailId : string;

    constructor(  restaurantId : number, restaurantName : string, location : string, restaurantImage : string ,
     rating : string, emailId : string) {
      this.restaurantId = restaurantId;
      this.restaurantName = restaurantName;
      this.location = location;
      this.restaurantImage = restaurantImage;
      this.rating = rating;
      this.emailId = emailId
    }
}
