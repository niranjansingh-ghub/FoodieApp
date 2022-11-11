package com.capstone.service;

import com.capstone.exception.RestaurantAlreadyExistException;
import com.capstone.exception.RestaurantNotFoundException;
import com.capstone.model.Cuisine;
import com.capstone.model.Restaurant;
import com.capstone.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantServiceImpl(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public Restaurant addRestaurant(Restaurant restaurant) throws RestaurantAlreadyExistException {
        try {
            if (restaurantRepository.findById(restaurant.getRestaurantId()).isEmpty()) {
                return restaurantRepository.save(restaurant);
            } else {
                throw new RestaurantAlreadyExistException();
            }
        } catch (RestaurantAlreadyExistException e) {
            e.printStackTrace();
        }
        return restaurantRepository.save(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> getRestaurantByLocation(String location) throws RestaurantNotFoundException {
        return restaurantRepository.findByLocation(location);
    }

    @Override
    public List<Restaurant> getRestaurantByCuisineName(String cuisineName) throws RestaurantNotFoundException {
        return restaurantRepository.findByCuisineName(cuisineName);
    }

    @Override
    public List<Restaurant> getRestaurantByRestaurantName(String restaurantName) throws RestaurantNotFoundException {
        return restaurantRepository.findByRestaurantName(restaurantName);
    }

    @Override
    public List<Restaurant> getRestaurantByLocationAndCuisineName(String location, String cuisineName) throws RestaurantNotFoundException {
        return restaurantRepository.findByLocationAndCuisineName(location, cuisineName);
    }

    @Override
    public List<Restaurant> getRestaurantByLocationAndRestaurantName(String location, String restaurantName) throws RestaurantNotFoundException {
        return restaurantRepository.findByLocationAndRestaurantName(location, restaurantName);
    }

    @Override
    public Boolean deleteRestaurant(int restaurantId) {
        if (restaurantRepository.findById(restaurantId).isEmpty()) {
            return false;
        }

            Restaurant restaurant = restaurantRepository.findById(restaurantId).get();
            restaurantRepository.delete(restaurant);
            return true;
    }

    @Override
    public Boolean addRestaurantCuisine(Cuisine cuisine, int restaurantId) throws RestaurantNotFoundException {
        if(restaurantRepository.findById(restaurantId).isEmpty()){
            throw new RestaurantNotFoundException();
        }
        Restaurant restaurant= restaurantRepository.findById(restaurantId).get();
        List<Cuisine> restCuisine =restaurant.getCuisine();
        if(restCuisine ==null){
            restCuisine =new ArrayList<>();
        }
        restCuisine.add(cuisine);
        restaurant.setCuisine(restCuisine);
        restaurantRepository.save(restaurant);
        return true;
    }

    @Override
    public Boolean deleteCuisine(int restaurantId, String cuisineName) throws RestaurantNotFoundException {
        Restaurant rest = restaurantRepository.findById(restaurantId).get();
        List<Cuisine> restCuisine = rest.getCuisine();
        Cuisine cuisine = restCuisine.stream()
                .filter(obj -> cuisineName.equals(obj.getCuisineName()))
                .findAny().orElse(null);
        if(restCuisine == null || !restCuisine.contains(cuisine)){
            throw new RestaurantNotFoundException();
        }
        restCuisine.remove(cuisine);
        rest.setCuisine(restCuisine);
        restaurantRepository.save(rest);
        return true;
    }

    @Override
    public List<Cuisine> getAllCuisineOfARestaurant(int restaurantId) throws RestaurantNotFoundException {
        if(restaurantRepository.findById(restaurantId).get() == null){
            throw new RestaurantNotFoundException();
        }
        Restaurant rest= restaurantRepository.findById(restaurantId).get();
        List<Cuisine> restCuisine =rest.getCuisine();
        return restCuisine;
    }

//    @Override
//    public Restaurant updateRestaurantById(int restaurantId, Restaurant restaurant) {
//        return null;
//    }
}
