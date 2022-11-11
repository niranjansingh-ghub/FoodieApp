package com.capstone.controller;

import com.capstone.exception.RestaurantAlreadyExistException;
import com.capstone.exception.RestaurantNotFoundException;
import com.capstone.model.Cuisine;
import com.capstone.model.Restaurant;
import com.capstone.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/foodieApp/restaurant")
public class RestaurantController {

    private RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @PostMapping("/addRestaurant")
    public ResponseEntity<?> addRestaurant (@RequestBody Restaurant restaurant) throws RestaurantAlreadyExistException {
        try {
            return new ResponseEntity<>(restaurantService.addRestaurant(restaurant), HttpStatus.OK);
        }
        catch (RestaurantAlreadyExistException rae)
        {
            throw new RestaurantAlreadyExistException();
        }
    }

//    @PutMapping("updateRestaurant")
//    public ResponseEntity<?> updateRestaurant(@RequestBody Restaurant restaurant) {
//        return new ResponseEntity<>(restaurantService.updateRestaurant(restaurant), HttpStatus.OK);
//    }

    @PutMapping(value = "/updateRestaurantbyId/{restaurantId}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveNewDish(@RequestBody Cuisine cuisine, @PathVariable int restaurantId) throws RestaurantNotFoundException {
        restaurantService.addRestaurantCuisine(cuisine,restaurantId);
        return new ResponseEntity<>("Saved",HttpStatus.OK);
    }

    @DeleteMapping("/delete/{restaurantId}/{cuisineName}")
    public ResponseEntity<?> deleteTask(@PathVariable("restaurantId") int restaurantId, @PathVariable("cuisineName") String cuisineName) throws RestaurantNotFoundException {
        restaurantService.deleteCuisine(restaurantId,cuisineName);
        return new ResponseEntity<>("Cuisine deleted",HttpStatus.OK);
    }

    @GetMapping("/getCuisines/{restaurantId}")
    public ResponseEntity<?> getAllCuisineOfARestaurant(@PathVariable int restaurantId) throws RestaurantNotFoundException {
        List<Cuisine> cuisineList =restaurantService.getAllCuisineOfARestaurant(restaurantId);
        return new ResponseEntity<>(cuisineList,HttpStatus.OK);
    }



//    @PutMapping("updateRestaurantById")
//    public ResponseEntity<?> updateRestaurantbyID(@RequestBody Restaurant restaurant, @PathVariable int restaurantId) {
//        return new ResponseEntity<Restaurant>(restaurantService.updateRestaurantById(restaurantId, restaurant), HttpStatus.OK);
//    }


    @GetMapping("/getRestaurant")
    public ResponseEntity<?> getAllRestaurants() {
        return new ResponseEntity<>(restaurantService.getAllRestaurants(), HttpStatus.OK);
    }

    @GetMapping("/restaurant-by-location/{location}")
    public ResponseEntity<?> getRestaurantByLocation(@PathVariable String location) throws RestaurantNotFoundException {
        return new ResponseEntity<>(restaurantService.getRestaurantByLocation(location), HttpStatus.OK);
    }

    @GetMapping("/restaurant-by-cuisineName/{cuisineName}")
    public ResponseEntity<?> getRestaurantByCuisine(@PathVariable String cuisineName) throws RestaurantNotFoundException {
        return new ResponseEntity<>(restaurantService.getRestaurantByCuisineName(cuisineName), HttpStatus.OK);
    }

    @GetMapping("/restaurant-by-restaurantName/{restaurantName}")
    public ResponseEntity<?> getRestaurantByRestaurant(@PathVariable String restaurantName) throws RestaurantNotFoundException {
        return new ResponseEntity<>(restaurantService.getRestaurantByRestaurantName(restaurantName), HttpStatus.OK);
    }

    @GetMapping("/restaurant-byLocationAndCuisine/{location}/{cuisineName}")
    public ResponseEntity<?> getRestaurantByLocationAndCuisineName(@PathVariable String location,@PathVariable String cuisineName) throws RestaurantNotFoundException {
        return new ResponseEntity<>(restaurantService.getRestaurantByLocationAndCuisineName(location, cuisineName), HttpStatus.OK);
    }

    @GetMapping("/restaurant-by/{location}/{restaurantName}")
    public ResponseEntity<?> getRestaurantByLocationAndRestaurantName(@PathVariable String restaurantName,@PathVariable String location) throws RestaurantNotFoundException {
        return new ResponseEntity<>(restaurantService.getRestaurantByLocationAndRestaurantName(location,restaurantName), HttpStatus.OK);
    }

    @DeleteMapping("/deleteRestaurant/{restaurantId}")
    public ResponseEntity<?> deleteRestaurant (@PathVariable int restaurantId) throws RestaurantNotFoundException {
        return new ResponseEntity<>(restaurantService.deleteRestaurant(restaurantId), HttpStatus.OK);
    }
}