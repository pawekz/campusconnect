package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.PlatformStatsDTO;
import com.teamnullpointer.campusconnect.service.AdminDashboardService;
import com.teamnullpointer.campusconnect.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admindashboard")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService service;

    @Autowired
    AppUserService appUserService;

    @GetMapping("/test")
    public String test(){
        return "You're Accessing the Admin Index Controller";
    }

    @GetMapping("/viewPlatformStats")
    public PlatformStatsDTO viewPlatformStats() {
        return service.viewPlatformStats();
    }

@PostMapping("/manageUsers")
public ResponseEntity<Page<AppUserDTO>> manageUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
    return ResponseEntity.ok(service.getUsers(page, size));
}

    @DeleteMapping("/manageUsers/{userId}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long userId) {
        appUserService.deleteUser(userId);
        return ResponseEntity.ok("User successfully deleted");
    }

    @PostMapping("/moderateContent")
    public void moderateContent() {
        service.moderateContent();
    }
}