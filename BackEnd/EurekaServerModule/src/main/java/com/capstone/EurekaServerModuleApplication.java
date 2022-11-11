package com.capstone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaServerModuleApplication {
	public static void main(String[] args) {
		SpringApplication.run(EurekaServerModuleApplication.class, args);
	}
}