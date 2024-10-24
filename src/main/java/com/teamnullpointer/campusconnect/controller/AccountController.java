package com.teamnullpointer.campusconnect.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    @GetMapping("/print")
    public String print() {
        return "Hello World";
    }
}

//this is a test controller to check if the application is running
//it will return "Hello World" when you go to localhost:8080/print
//if you see "Hello World" while running localhost:5173, then the application is running