export class FavouriteCuisine {
    public cuisineId : number;
    public cuisineName : string;
    public cuisineImage : string;
    public emailId : string;
    public price: number;
    
    constructor(cuisineId : number , cuisineName : string ,cuisineImage : string , emailId : string, price : number,) {
        this.cuisineId = cuisineId;
        this.cuisineName = cuisineName;
        this.cuisineImage = cuisineImage;
        this.emailId = emailId;
        this.price=price
    }
}
