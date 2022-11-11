package com.capstone.service;

import com.capstone.entity.FavouriteRestaurant;
import com.capstone.exception.RestaurantAlreadyExistException;
import com.capstone.repository.FavouriteRestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteRestaurantServiceImpl implements FavouriteRestaurantService{

    private FavouriteRestaurantRepository favouriteRestaurantRepository;

    @Autowired
    public FavouriteRestaurantServiceImpl(FavouriteRestaurantRepository favouriteRestaurantRepository) {
        this.favouriteRestaurantRepository = favouriteRestaurantRepository;
    }

    @Override
    public FavouriteRestaurant addFavRestaurant(FavouriteRestaurant favouriteRestaurant) throws RestaurantAlreadyExistException {
        FavouriteRestaurant result = (favouriteRestaurantRepository.findByEmailIdAndRestaurantName(favouriteRestaurant.getEmailId(),favouriteRestaurant.getRestaurantName()));
        if (result==null) {
            return favouriteRestaurantRepository.save(favouriteRestaurant);
        }
        else {
            throw new RestaurantAlreadyExistException();
        }
    }

    @Override
    public List<FavouriteRestaurant> getAllFavRestaurant() {
        return favouriteRestaurantRepository.findAll();
    }

    @Override
    public List<FavouriteRestaurant> getAllFavRestaurantByEmailId(String emailId) {
        return favouriteRestaurantRepository.findAllByEmailId(emailId);
    }

//    @Override
//    public boolean deleteFavRestaurantByEmailIdAndRestaurantName(String emailId, String restaurantName) {
//        favouriteRestaurantRepository.deleteByEmailIdAndRestaurantName(emailId, restaurantName);
//        return true;
//    }

    @Override
    public boolean deleteByRestaurantId(int restaurantId) {
        favouriteRestaurantRepository.deleteById(restaurantId);
        return true;
    }
}
