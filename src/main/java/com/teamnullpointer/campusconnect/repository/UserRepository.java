package com.teamnullpointer.campusconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserRepository, Integer> {
    void setEmail(String email);
    void setPassword(String password);
    void setName(String name);
    void setUser_type(String user_type);
}
