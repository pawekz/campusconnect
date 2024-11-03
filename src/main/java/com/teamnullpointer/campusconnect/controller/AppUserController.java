package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.LoginDTO;
import com.teamnullpointer.campusconnect.entity.AppUserEntity;
import com.teamnullpointer.campusconnect.response.LoginResponse;
import com.teamnullpointer.campusconnect.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
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
        return ResponseEntity.ok(loginResponse);
    }
    @PutMapping("/updateuserrecord")
    public AppUserEntity putUserDetails(@RequestParam int id, @RequestBody AppUserEntity newUserDetails) {
        return AppUserService.putAppUserDetails(id, newUserDetails);
    }





    /*@PostMapping("/postuserrecord")
    public UserEntity postUserRecord(@RequestBody UserEntity user) {
        return userService.postUserRecord(user);
    }

    @GetMapping("/getuserrecords")
    public List<UserEntity> getUserRecords() {
        return userService.getAllUsers();
    }


    @DeleteMapping("/deleteuserdetails/{id}")
    public String deleteUserDetails(@PathVariable int id) {
        return userService.deleteUser(id);
    }*/
}