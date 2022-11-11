package com.capstone.controller;

import com.capstone.entity.User;
import com.capstone.exception.PasswordDoesNotMatchException;
import com.capstone.exception.UserAlreadyExistException;
import com.capstone.exception.UserNotFoundException;
import com.capstone.service.SecurityTokenGenerator;
import com.capstone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/foodieApp/user")
public class UserController {

    private UserService userService;
    private SecurityTokenGenerator securityTokenGenerator;

    @Autowired
    public UserController(UserService userService, SecurityTokenGenerator securityTokenGenerator){
        this.userService = userService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> addUser(@RequestBody User user) throws UserAlreadyExistException, PasswordDoesNotMatchException
    {
        try {
            if (user.getPassword().equals(user.getConfirmPassword())) {
                return new ResponseEntity<>(userService.addUser(user), HttpStatus.OK);
            }
            else {
                throw new PasswordDoesNotMatchException();
            }
        }
        catch (UserAlreadyExistException uae)
        {
            throw new UserAlreadyExistException();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCheck(@RequestBody User user) throws UserNotFoundException {
        Map<String, String> map = null;

        try {
            User resultUser = userService.authenticationUser(user.getEmailId(),user.getPassword());

            if (resultUser !=null) {
                map = securityTokenGenerator.generateToken(resultUser);
                map.put("user",resultUser.getFullName());
                map.put("role",resultUser.getRole());
            }
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        catch (UserNotFoundException uae) {
            throw new UserNotFoundException();
        }
        catch (Exception e) {
            return new ResponseEntity<>("Other Exception Occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getAllUsers()
    {
        return new ResponseEntity<>(userService.getAllUsers(),HttpStatus.OK);
    }
}