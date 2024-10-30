package com.teamnullpointer.campusconnect.controller;
import com.teamnullpointer.campusconnect.repository.UserRepository;
import com.teamnullpointer.campusconnect.service.UserService;
import com.teamnullpointer.campusconnect.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/print")
    public String print() {
        return "User Controller";
    }

    @PostMapping("/postuserrecord")
    public UserEntity postUserRecord(@RequestBody UserEntity user) {
        return userService.postUserRecord(user);
    }

    @GetMapping("/getuserrecords")
    public List<UserEntity> getUserRecords() {
        return userService.getAllUsers();
    }

    @PutMapping("/updateuserrecord")
    public UserRepository putUserDetails(@RequestParam int id, @RequestBody UserEntity newUserDetails){
        return (UserRepository) userService.putUserDetails(id, newUserDetails);
    }

    @DeleteMapping("/deleteuserdetails/{id}")
    public String deleteUserDetails(@PathVariable int id) {
        return userService.deleteUser(id);
    }
}
