package com.capstone.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FavouriteCuisine {
    @Id
    private int cuisineId;
    private String emailId;
    private String cuisineName;
    private String cuisineImage;
    private double price;
}