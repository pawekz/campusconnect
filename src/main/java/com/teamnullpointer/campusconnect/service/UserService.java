package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.entity.UserEntity;
import com.teamnullpointer.campusconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;  // Better naming
    private Iterable<UserEntity> userRecords;

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserRepository updateUser(int id, UserEntity newUserDetails) throws ResourceNotFoundException {
        UserRepository existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        existingUser.setEmail(newUserDetails.getEmail());
        existingUser.setPassword(newUserDetails.getPassword());
        existingUser.setName(newUserDetails.getName());
        existingUser.setUser_type(newUserDetails.getUser_type());

        return userRepository.save(existingUser);
    }

    public Iterable<UserEntity> getUserRecords() {
        return userRecords;
    }

    public UserEntity postUserRecord(UserEntity user) {
    }

    public UserEntity putUserDetails(int id, UserEntity newUserDetails) {
    }

    public String deleteUser(int id) {
        return null;
    }

    