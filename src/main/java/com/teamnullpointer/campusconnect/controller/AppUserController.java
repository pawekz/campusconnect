package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.LoginDTO;
import com.teamnullpointer.campusconnect.response.JwtResponse;
import com.teamnullpointer.campusconnect.response.LoginResponse;
import com.teamnullpointer.campusconnect.service.AppUserService;
import com.teamnullpointer.campusconnect.util.JwtUtil;
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
        String token = JwtUtil.generateToken(loginDTO.getEmail());
        return ResponseEntity.ok(new JwtResponse(token));
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
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