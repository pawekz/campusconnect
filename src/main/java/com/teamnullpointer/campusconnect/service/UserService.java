package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.entity.UserEntity;
import com.teamnullpointer.campusconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity postUserRecord(UserEntity user) {
        return userRepository.save(user);
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity putUserDetails(int id, UserEntity newUserDetails) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User with id " + id + " not found"));
        user.setEmail(newUserDetails.getEmail());
        user.setPassword(newUserDetails.getPassword());
        user.setName(newUserDetails.getName());
        user.setUser_type(newUserDetails.getUser_type());
        return userRepository.save(user);
    }

    public String deleteUser(int id) {
        if (userRepository.findById(id).isPresent()) {
            userRepository.deleteById(id);
            return "Successfully deleted the user";
        } else {
            throw new NoSuchElementException("User with id " + id + " not found");
        }
    }
}