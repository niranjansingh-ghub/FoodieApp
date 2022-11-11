package com.capstone.controller;

import com.capstone.entity.FavouriteCuisine;
import com.capstone.exception.CuisineAlreadyExistException;
import com.capstone.service.FavouriteCuisineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/foodieApp/favourites")
public class FavouriteCuisineController {
    private FavouriteCuisineService favouriteCuisineService;

    @Autowired
    public FavouriteCuisineController(FavouriteCuisineService favouriteCuisineService) {
        this.favouriteCuisineService = favouriteCuisineService;
    }

    @PostMapping("/addFavCuisine")
    public ResponseEntity<?> addFavCuisine(@RequestBody FavouriteCuisine favouriteCuisine) throws CuisineAlreadyExistException {
        try {
            return new ResponseEntity<>(favouriteCuisineService.addFavCuisine(favouriteCuisine), HttpStatus.OK);
        }
        catch (CuisineAlreadyExistException cae) {
            throw new CuisineAlreadyExistException();
        }
    }

    @GetMapping("/favCuisineByEmailId/{emailId}")
    public ResponseEntity<?> getAllCuisineByEmailId(@PathVariable String emailId) {
        return new ResponseEntity<>(favouriteCuisineService.getAllFavCuisineByEmailId(emailId),HttpStatus.OK);
    }

    @GetMapping("/favCuisine")
    public ResponseEntity<?> getAllFavCuisine()
    {
        return new ResponseEntity<>(favouriteCuisineService.getAllCuisine(),HttpStatus.OK);
    }

    @DeleteMapping("/favCuisine/{cuisineId}")
    public ResponseEntity<?> deleteFavCuisine(@PathVariable int cuisineId) {
        favouriteCuisineService.deleteByCuisineId(cuisineId);
        return new ResponseEntity<>("Cuisine Deleted",HttpStatus.OK);
    }

    @DeleteMapping("/deleteCuisine/{emailId}")
    public ResponseEntity<?> deleteAllCuisine(@PathVariable String emailId){
        favouriteCuisineService.deleteByEmailId(emailId);
        return new ResponseEntity<>("All Cuisines Deleted",HttpStatus.OK);
    }

}
