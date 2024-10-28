package com.teamnullpointer.campusconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserRepository, Integer> {
    public UserRepository findByName(String name);
}
