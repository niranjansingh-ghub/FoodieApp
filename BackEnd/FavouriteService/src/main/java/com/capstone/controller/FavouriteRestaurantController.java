package com.capstone.controller;

import com.capstone.entity.FavouriteRestaurant;
import com.capstone.exception.RestaurantAlreadyExistException;
import com.capstone.service.FavouriteRestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/foodieApp/favourites")
public class FavouriteRestaurantController {
    private FavouriteRestaurantService favouriteRestaurantService;

    @Autowired
    public FavouriteRestaurantController(FavouriteRestaurantService favouriteRestaurantService) {
        this.favouriteRestaurantService = favouriteRestaurantService;
    }

    @PostMapping("/addFavRestaurant")
    public ResponseEntity<?> addFavRestaurant(@RequestBody FavouriteRestaurant favouriteRestaurant) throws RestaurantAlreadyExistException {
        try {
            return new ResponseEntity<>(favouriteRestaurantService.addFavRestaurant(favouriteRestaurant), HttpStatus.OK);
        }
        catch (RestaurantAlreadyExistException rae) {
            throw new RestaurantAlreadyExistException();
        }
    }

    @GetMapping("/favRestaurantByEmailId/{emailId}")
    public ResponseEntity<?> getAllRestaurantByEmailId(@PathVariable String emailId) {
        return new ResponseEntity<>(favouriteRestaurantService.getAllFavRestaurantByEmailId(emailId), HttpStatus.OK);
    }

    @GetMapping("/favRestaurant")
    public ResponseEntity<?> getAllFavRestaurant()
    {
        return new ResponseEntity<>(favouriteRestaurantService.getAllFavRestaurant(),HttpStatus.OK);
    }

//    @DeleteMapping("/delRestaurant/{emailId}/{restaurantName}")
//    public ResponseEntity<?> deleteFavRestaurantByEmailIdAndRestaurantName(@PathVariable String emailId,@PathVariable String restaurantName){
//        favouriteRestaurantService.deleteFavRestaurantByEmailIdAndRestaurantName(emailId, restaurantName);
//        return new ResponseEntity<>("Restaurant Deleted",HttpStatus.OK);
//    }

    @DeleteMapping("/favRestaurant/{restaurantId}")
    public ResponseEntity<?> deleteFavCuisine(@PathVariable int restaurantId) {
        favouriteRestaurantService.deleteByRestaurantId(restaurantId);
        return new ResponseEntity<>("Cuisine Deleted",HttpStatus.OK);
    }
}