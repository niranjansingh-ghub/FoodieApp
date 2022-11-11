import { CuisineAdmin } from "./cuisine-admin";

export class RestaurantAdmin {
    public restaurantId: number;
    public restaurantName: string;
    public location: string;
    public restaurantImage: string;
    public rating: number;
    public cuisine : CuisineAdmin;

    constructor(restaurantId: number, restaurantName: string,
        location: string,
        restaurantImage: string,
        rating: number,
        cuisine : CuisineAdmin) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.location = location;
        this.restaurantImage = restaurantImage;
        this.rating = rating;
        this.cuisine = cuisine;
    }
}
