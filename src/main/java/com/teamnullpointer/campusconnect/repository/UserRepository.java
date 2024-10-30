package com.teamnullpointer.campusconnect.repository;

import com.teamnullpointer.campusconnect.entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    void setEmail(String email);
    void setPassword(String password);
    void setName(String name);
    void setUser_type(String user_type);

    ;
}
