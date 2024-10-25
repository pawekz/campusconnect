package com.teamnullpointer.campusconnect.repository;
import com.teamnullpointer.campusconnect.entity.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    public UserEntity findByUser(String user);
}