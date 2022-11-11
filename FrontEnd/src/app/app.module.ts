import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SignupComponent } from './components/signup/signup.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantInfoComponent } from './components/restaurant-info/restaurant-info.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartComponent } from './components/cart/cart.component';
import { AdminRestaurantComponent } from './components/admin-restaurant/admin-restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    FavouriteComponent,
    NavbarComponent,
    RestaurantComponent,
    RestaurantInfoComponent,
    AdminHomeComponent,
    CartComponent,
    AdminRestaurantComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgToastModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatMenuModule,
    MatTableModule,
    MatSlideToggleModule,
    CarouselModule
  ],
  providers: [RestaurantComponent , RestaurantInfoComponent,NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
