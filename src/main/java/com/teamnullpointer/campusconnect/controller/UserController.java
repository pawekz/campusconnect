package com.teamnullpointer.campusconnect.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(method = {RequestMethod.GET, path = "/user"})
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
    public Iterable<UserEntity> getUserRecords() {
        return userService.getUserRecords();
    }
    @PutMapping("/updateuserrecord")
    public UserEntity putUserDetails(@RequestParam int id, @RequestBody UserEntity newUserDetails){
        return userService.putUserDetails(id, newUserDetails);
    }
    @DeleteMapping("/deleteuserdetails/{id}")
    public String deleteUserDetails(@PathVariable int id) {
        return userService.deleteUser(id);
    }
}
