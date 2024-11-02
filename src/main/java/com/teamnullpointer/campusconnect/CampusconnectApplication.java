package com.teamnullpointer.campusconnect;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//purpose of exclude is to disable temporarily the security configuration of Spring Boot,
// example is that if you send account details to the database, it will throw an error 401 Unauthorized
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class CampusconnectApplication {
    private static final Logger logger = LoggerFactory.getLogger(CampusconnectApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(CampusconnectApplication.class, args);
        logger.info("CampusConnect Application Started");
    }


}
