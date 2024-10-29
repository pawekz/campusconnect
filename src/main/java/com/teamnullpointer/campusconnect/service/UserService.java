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
    UserRepository urepo;

    public UserService() {
        super();
    }

    public UserEntity postUserRecord(UserEntity user) {
        return urepo.save(user);
    }

    public List<UserEntity> getAllUsers() {
        return urepo.findAll();
    }


    public List<UserEntity> getUserRecords() {
        return urepo.findAll();
    }

    public UserRepository putUserDetails(int id, UserEntity newUserDetails) {
        UserRepository user = (UserRepository) new UserEntity();
        try {
            user = (UserRepository) urepo.findById(id).get();
            user.setEmail(newUserDetails.getEmail());
            user.setPassword(newUserDetails.getPassword());
            user.setName(newUserDetails.getName());
            user.setUser_type(newUserDetails.getUser_type());
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("User with id " + id + " not found");
        } finally {
            return urepo.save(user);
        }
    }
    public String deleteUser(int id) {
        String msg = "";
        if (urepo.findById(id) != null) {
            urepo.deleteById(id);
            msg = "Successfully deleted the user";
        } else {
            throw new NoSuchElementException("User with id " + id + " not found");
        }
        return msg;
    }
}
