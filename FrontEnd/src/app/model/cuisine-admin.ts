export class CuisineAdmin {
    public cuisineName: string;
    public cuisineImage: string;
    public price: number;

    constructor(cuisineName: string, cuisineImage: string, price: number) {
        this.cuisineName = cuisineName;
        this.cuisineImage = cuisineImage;
        this.price = price;
    }
}
