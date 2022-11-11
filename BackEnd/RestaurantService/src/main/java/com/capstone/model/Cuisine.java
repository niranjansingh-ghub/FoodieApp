package com.capstone.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Cuisine {

    @Id
    private String cuisineName;
    private String cuisineImage;
    private double price;
}

//Cuisine cuisine = new Cuisine("Burger","Burger.jpg",80)