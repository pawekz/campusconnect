package com.teamnullpointer.campusconnect;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CampusconnectApplication {
    private static final Logger logger = LoggerFactory.getLogger(CampusconnectApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(CampusconnectApplication.class, args);
        logger.info("CampusConnect Application Started");
    }


}
