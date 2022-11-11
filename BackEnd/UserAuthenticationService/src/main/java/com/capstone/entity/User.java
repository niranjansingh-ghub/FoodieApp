package com.capstone.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User {
    @Id
    private String emailId;
    private String fullName;
    private String password;
    private String confirmPassword;
    private String mobileNo;
    private String role;
}