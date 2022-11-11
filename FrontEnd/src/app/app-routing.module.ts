import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { SignupComponent } from './components/signup/signup.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantInfoComponent } from './components/restaurant-info/restaurant-info.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminRestaurantComponent } from './components/admin-restaurant/admin-restaurant.component';

const routes: Routes = [
  {path:'', redirectTo:'restaurant',pathMatch:'full'},
  {path:'restaurant', component:RestaurantComponent},
  {path:'signup', component : SignupComponent},
  {path:'admin', component : AdminHomeComponent},
  {path:'favourite', component : FavouriteComponent},
  {path:'restaurantInfo', component : RestaurantInfoComponent},
  {path:'navbar', component : NavbarComponent},
  {path:'cart', component : CartComponent},
  {path:'adminRestaurant', component : AdminRestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
exports: [RouterModule]
})
export class AppRoutingModule { }
