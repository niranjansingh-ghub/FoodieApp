package com.capstone.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
@Getter
@Setter
@AllArgsConstructor
@ToString
public class Restaurant {
    @Id
    private int restaurantId;
    private String restaurantName;
    private String restaurantImage;
    private String location;
    private double rating;
    private List<Cuisine> cuisine;

    public Restaurant() {
        cuisine = new ArrayList<Cuisine>();
    }
}