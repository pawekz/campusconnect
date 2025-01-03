package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.PlatformStatsDTO;
import com.teamnullpointer.campusconnect.service.AdminDashboardService;
import com.teamnullpointer.campusconnect.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/admindashboard")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService service;

    @Autowired
    AppUserService appUserService;

    @GetMapping("/test")
    public String test() {
        return "You're Accessing the Admin Index Controller";
    }

    @GetMapping("/viewPlatformStats")
    public PlatformStatsDTO viewPlatformStats() {
        PlatformStatsDTO stats = service.viewPlatformStats();
        System.out.println("Active Listings: " + stats.getActiveListing());
        return stats;
    }

    @GetMapping("/manageUsers")
    public ResponseEntity<List<AppUserDTO>> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers());
    }

    @DeleteMapping("/manageUsers/{userId}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long userId) {
        appUserService.deleteUser(userId);
        return ResponseEntity.ok("User successfully deleted");
    }

    @PutMapping("/manageUsers/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody AppUserDTO userDTO) {
        try {
            appUserService.updateUser(userId, userDTO);
            return ResponseEntity.ok("User successfully updated");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error updating user: " + e.getMessage());
        }
    }

    @PostMapping("/moderateContent")
    public void moderateContent() {
        service.moderateContent();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid request: " + e.getMessage());
    }
}
