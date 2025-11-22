package com.teamnullpointer.campusconnect.repository;

import com.teamnullpointer.campusconnect.entity.AppUserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
//UserEntity, Integer is the entity class and the type of the primary key of that entity
public interface AppUserRepository extends JpaRepository<AppUserEntity, Integer> {
    Optional<AppUserEntity> findOneByEmailAndPassword(String email, String password);
    AppUserEntity findByEmail(String email);

    Page<AppUserEntity> findByUserType(String student, Pageable pageable);

    boolean existsByEmail(String email);
}