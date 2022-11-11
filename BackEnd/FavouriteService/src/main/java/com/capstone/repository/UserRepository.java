package com.capstone.repository;

import com.capstone.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    public abstract User findByEmailIdAndPassword(String emailId, String password);
}