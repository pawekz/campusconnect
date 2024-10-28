package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.entity.UserEntity;
import com.teamnullpointer.campusconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository urepo;

    public UserService() { super();
    }
    public UserEntity postUserRepository(UserEntity user) {
        return urepo.save(user);
    }
    public List<UserEntity> getAllUsers() {
        return urepo.findAll();
    }
    public UserEntity postUserRecord(UserEntity user) {
        return urepo.save(user);
    }
    public List<UserEntity> getUserRecords() {
        return urepo.findAll();
    }
    public UserEntity putUserDetails(int id, UserEntity newUserDetails) {
        UserEntity user = new UserEntity();
        try {
            user = urepo.findById(id).get();
            user.setEmail(newUserDetails.getEmail());
            user.setPassword(newUserDetails.getPassword());
            user.setName(newUserDetails.getName());
            user.setUser_type(newUserDetails.getUser_type());
        } catch (NoSuchElementException e) {
            throw new NameNotFoundException("User with id " + id + " not found");
        } finally {
            return urepo.save(user);
        }
    }
}
