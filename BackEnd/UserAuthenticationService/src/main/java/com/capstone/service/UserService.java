package com.capstone.service;

import com.capstone.entity.User;
import com.capstone.exception.UserAlreadyExistException;
import com.capstone.exception.UserNotFoundException;

import java.util.List;

public interface UserService {
    public abstract User addUser(User user) throws UserAlreadyExistException;

    public abstract User authenticationUser(String emailId, String password) throws UserNotFoundException;

    public abstract List<User> getAllUsers();
}