package com.capstone.service;

import com.capstone.entity.FavouriteCuisine;
import com.capstone.exception.CuisineAlreadyExistException;
import com.capstone.repository.FavouriteCuisineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteCuisineServiceImpl implements FavouriteCuisineService{

    private FavouriteCuisineRepository favouriteCuisineRepository;

    @Autowired
    public FavouriteCuisineServiceImpl(FavouriteCuisineRepository favouriteCuisineRepository) {
        this.favouriteCuisineRepository = favouriteCuisineRepository;
    }

    @Override
    public FavouriteCuisine addFavCuisine(FavouriteCuisine favouriteCuisine) throws CuisineAlreadyExistException {
        FavouriteCuisine result = (favouriteCuisineRepository.findByEmailIdAndCuisineName(favouriteCuisine.getEmailId(),favouriteCuisine.getCuisineName()));
        if (result==null) {
            return favouriteCuisineRepository.save(favouriteCuisine);
        }
        else {
            throw new CuisineAlreadyExistException();
        }
    }

    @Override
    public List<FavouriteCuisine> getAllCuisine() {
        return favouriteCuisineRepository.findAll();
    }

    @Override
    public List<FavouriteCuisine> getAllFavCuisineByEmailId(String emailId) {
        return favouriteCuisineRepository.findAllByEmailId(emailId);
    }

    @Override
    public boolean deleteByCuisineId(int cuisineId) {
        favouriteCuisineRepository.deleteById(cuisineId);
        return true;
    }

    @Override
    public boolean deleteByEmailId(String emailId) {
        List<FavouriteCuisine> list=favouriteCuisineRepository.findAllByEmailId(emailId);
        for (int i=0;i<list.size();i++) {
            favouriteCuisineRepository.deleteById(list.get(i).getCuisineId());
        }
        return true;
    }

}