package com.capstone.repository;

import com.capstone.entity.FavouriteCuisine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteCuisineRepository extends MongoRepository<FavouriteCuisine, Integer> {
    public abstract FavouriteCuisine findByEmailIdAndCuisineName(String emailId, String cuisineName);
    public abstract List<FavouriteCuisine> findAllByEmailId(String emailId);
}