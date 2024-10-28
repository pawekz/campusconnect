package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.entity.AdminDashboardEntity;
import com.teamnullpointer.campusconnect.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admindashboard")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService service;

    @GetMapping("/viewPlatformStats")
    public AdminDashboardEntity viewPlatformStats() {
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