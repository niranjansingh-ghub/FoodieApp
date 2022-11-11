package com.capstone.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document
public class User {
    @Id
    private String emailId;
    private String fullName;
    private String mobileNo;
    private String password;
    private String confirmPassword;
    private String role;
}