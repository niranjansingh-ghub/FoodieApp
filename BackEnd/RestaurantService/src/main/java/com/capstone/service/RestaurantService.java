package com.capstone.service;

import com.capstone.exception.RestaurantAlreadyExistException;
import com.capstone.exception.RestaurantNotFoundException;
import com.capstone.model.Cuisine;
import com.capstone.model.Restaurant;

import java.util.List;

public interface RestaurantService {

    public abstract Restaurant addRestaurant(Restaurant restaurant) throws RestaurantAlreadyExistException;

    public abstract List<Restaurant> getAllRestaurants();

    public abstract List<Restaurant> getRestaurantByLocation(String location) throws RestaurantNotFoundException;
    public abstract List<Restaurant> getRestaurantByCuisineName(String cuisineName) throws RestaurantNotFoundException;
    public abstract List<Restaurant> getRestaurantByRestaurantName(String restaurantName) throws RestaurantNotFoundException;

    public abstract List<Restaurant> getRestaurantByLocationAndCuisineName(String location, String cuisineName) throws RestaurantNotFoundException;
    public abstract List<Restaurant> getRestaurantByLocationAndRestaurantName(String location, String restaurantName) throws RestaurantNotFoundException;

    Boolean deleteRestaurant(int restaurantId);

    Boolean addRestaurantCuisine(Cuisine cuisine, int restaurantId) throws RestaurantNotFoundException;

    Boolean deleteCuisine(int restaurantId, String cuisineName) throws RestaurantNotFoundException;

    List<Cuisine> getAllCuisineOfARestaurant(int restaurantId) throws RestaurantNotFoundException;

    //Restaurant updateRestaurantById(int restaurantId, Restaurant restaurant);
}
