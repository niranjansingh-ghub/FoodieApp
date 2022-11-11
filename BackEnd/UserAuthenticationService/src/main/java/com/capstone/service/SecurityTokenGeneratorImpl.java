package com.capstone.service;

import com.capstone.entity.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class SecurityTokenGeneratorImpl implements SecurityTokenGenerator{

    @Override
    public Map<String, String> generateToken(User user){
        Date date = new Date();
        date.setMinutes(date.getMinutes()+60);

        System.out.println("\n\nExisting claims: "+ Jwts.claims().values());

        String jwttoken= Jwts.builder()
                .setSubject(user.getFullName())
                .setIssuedAt(new Date())
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS256,"foodieAppKey").compact();
        Map<String,String>map=new HashMap<>();
        map.put("token",jwttoken);
        map.put("message","User successfully logged In");
        return map;
    }
}
