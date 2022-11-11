package com.capstone.service;

import com.capstone.entity.FavouriteCuisine;
import com.capstone.exception.CuisineAlreadyExistException;
//import com.capstone.exception.CuisineAlreadyExistException;

import java.util.List;

public interface FavouriteCuisineService {

    public abstract FavouriteCuisine addFavCuisine(FavouriteCuisine favouriteCuisine) throws CuisineAlreadyExistException;

    public abstract List<FavouriteCuisine> getAllCuisine();

    public abstract List<FavouriteCuisine> getAllFavCuisineByEmailId(String emailId);

    public abstract boolean deleteByCuisineId(int cuisineId);

    public abstract boolean deleteByEmailId(String emailId);
}