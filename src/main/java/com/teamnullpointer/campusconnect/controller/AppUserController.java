package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.LoginDTO;
import com.teamnullpointer.campusconnect.entity.AppUserEntity;
import com.teamnullpointer.campusconnect.response.JwtResponse;
import com.teamnullpointer.campusconnect.response.LoginResponse;
import com.teamnullpointer.campusconnect.service.AppUserService;
import com.teamnullpointer.campusconnect.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/user")
public class AppUserController {


    @Autowired
    private AppUserService appUserService;

    @GetMapping("/print")
    public String print() {
        return "User Controller";
    }

    @PostMapping(path = "/save")
    public String saveUser(@RequestBody AppUserDTO userDTO) {
        return appUserService.addUser(userDTO);
    }
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginAppUser(@RequestBody LoginDTO loginDTO) {
        LoginResponse loginResponse = appUserService.loginAppUser(loginDTO);
        if (loginResponse.isSuccess()) {
            AppUserEntity appUser = appUserService.findByEmail(loginDTO.getEmail());
            String token = JwtUtil.generateToken(appUser.getName(), loginDTO.getEmail(), appUser.getUserType(), appUser.getId());
            return ResponseEntity.ok(new JwtResponse(token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


@GetMapping("/validate-token")
public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
        String token = authHeader.substring(7);
        Claims claims = JwtUtil.validateToken(token);
        if (claims != null) {
            String email = claims.getSubject();
            AppUserEntity user = appUserService.findByEmail(email);
            if (user != null) {
                return ResponseEntity.ok().build();
            }
        }
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
}
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable int id, @RequestHeader("Authorization") String authHeader) {
        // Extract user ID from JWT token
        String token = authHeader.substring(7);
        Claims claims = JwtUtil.validateToken(token);
        Integer tokenUserId = claims.get("user_id", Integer.class);

        // Only allow access if the requested profile matches the authenticated user
        if (tokenUserId != null && tokenUserId == id) {
            AppUserEntity user = appUserService.getUserById(Long.valueOf(id));
            if (user != null) {
                AppUserDTO userDTO = new AppUserDTO(
                        user.getId(),
                        user.getEmail(),
                        null,
                        user.getName(),
                        user.getUserType()
                );
                return ResponseEntity.ok(userDTO);
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
    }


    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateUserProfile(
            @PathVariable int id,
            @RequestBody AppUserDTO userDTO
    ) {
        try {
            appUserService.updateUser(Long.valueOf(id), userDTO);
            return ResponseEntity.ok("ProfilePage updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating profile: " + e.getMessage());
        }
    }


    /*@PostMapping("/postuserrecord")
    public UserEntity postUserRecord(@RequestBody UserEntity user) {
        return userService.postUserRecord(user);
    }

    @GetMapping("/getuserrecords")
    public List<UserEntity> getUserRecords() {
        return userService.getAllUsers();
    }

    @PutMapping("/updateuserrecord")
    public UserEntity putUserDetails(@RequestParam int id, @RequestBody UserEntity newUserDetails) {
        return userService.putUserDetails(id, newUserDetails);
    }

    @DeleteMapping("/deleteuserdetails/{id}")
    public String deleteUserDetails(@PathVariable int id) {
        return userService.deleteUser(id);
    }*/
}