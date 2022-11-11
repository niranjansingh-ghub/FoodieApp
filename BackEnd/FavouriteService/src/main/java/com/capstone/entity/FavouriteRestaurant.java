package com.capstone.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document
public class FavouriteRestaurant {
    @Id
    private int restaurantId;
    private String restaurantName;
    private String location;
    private String restaurantImage;
    private double rating;
    private String emailId;
}