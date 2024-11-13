package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.DTO.PlatformStatsDTO;
import com.teamnullpointer.campusconnect.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admindashboard")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService service;

    @GetMapping("/test")
    public String test(){
        return "You're Accessing the Admin Index Controller";
    }

    @GetMapping("/viewPlatformStats")
    public PlatformStatsDTO viewPlatformStats() {
        return service.viewPlatformStats();
    }

    @PostMapping("/manageUsers")
    public void manageUsers() {
        service.manageUsers();
    }

    @PostMapping("/moderateContent")
    public void moderateContent() {
        service.moderateContent();
    }
}