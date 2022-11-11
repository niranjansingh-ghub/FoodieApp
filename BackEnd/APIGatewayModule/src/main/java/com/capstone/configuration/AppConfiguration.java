package com.capstone.configuration;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {

    @Bean
    public RouteLocator getRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p->p
                        .path("/foodieApp/user/**").uri("http://localhost:8080/"))
                .route(p->p
                        .path("/foodieApp/favourites/**").uri("http://localhost:8082/"))
                .route(p->p
                        .path("/foodieApp/userService/addUser").uri("http://localhost:8082/"))
                .route(p->p
                        .path("/foodieApp/restaurant/**").uri("http://localhost:8081/"))
                .route(p->p
                        .path("/foodieApp/cuisine/**").uri("http://localhost:8081/"))
                .route(p->p
                        .path("/foodieApp/profile/**").uri("http://localhost:8080/"))
                .build();
    }
}
