import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ShareInformationService {

  restaurantData : any;

  constructor() { }

  setData(data : any) {
    this.restaurantData = data;
  }

  getData() {
    return this.restaurantData;
  }
}
