package com.teamnullpointer.campusconnect.service.impl;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.LoginDTO;
import com.teamnullpointer.campusconnect.entity.AppUserEntity;
import com.teamnullpointer.campusconnect.repository.AppUserRepository;
import com.teamnullpointer.campusconnect.response.LoginResponse;
import com.teamnullpointer.campusconnect.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@Service("appUserService")
public class AppUserIMPL implements AppUserService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(AppUserDTO appUserDTO) {
        AppUserEntity appUser = new AppUserEntity(
                appUserDTO.getId(),
                appUserDTO.getEmail(),
                this.passwordEncoder.encode(appUserDTO.getPassword()),
                appUserDTO.getName(),
                appUserDTO.getUser_type()
        );
        appUserRepository.save(appUser);
        return appUser.getName();
    }

    // Add this line at the beginning of the class
    private static final Logger logger = LoggerFactory.getLogger(AppUserIMPL.class);


    @Override
    public LoginResponse loginAppUser(LoginDTO loginDTO) {
        AppUserEntity appUser1 = appUserRepository.findByEmail(loginDTO.getEmail());

        if (appUser1 != null) {
            String password = appUser1.getPassword();
            String enteredPassword = loginDTO.getPassword();
            Boolean isPasswordMatch = passwordEncoder.matches(enteredPassword, password);
            if (isPasswordMatch) {
                logger.debug("Login successful for user: {}", loginDTO.getEmail());
                return new LoginResponse("Login Successful", true);
            } else {
                logger.debug("Login failed for user: {} - Incorrect password", loginDTO.getEmail());
                return new LoginResponse("Login Failed", false);
            }
        } else {
            logger.debug("Login failed - Institution email not found: {}", loginDTO.getEmail());
            return new LoginResponse("Institution email not found", false);
        }
    }


    @Override
    public Page<AppUserDTO> getAllUsersWithPagination(Pageable pageable) {
        Page<AppUserEntity> users = appUserRepository.findByUserType("STUDENT", pageable);
        return users.map(user -> new AppUserDTO(
                user.getId(),
                user.getEmail(),
                null,
                user.getName(),
                user.getUserType()
        ));
    }


    @Override
    public void deleteUser(int userId) {
        appUserRepository.deleteById(userId);
    }

    @Override
    public void deleteUser(Long userId) {
        appUserRepository.deleteById(Math.toIntExact(userId));
    }

    @Override
    public AppUserEntity findByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    @Override
    public AppUserEntity getUserById(Long userId) {
        return appUserRepository.findById(Math.toIntExact(userId))
                .orElse(null);
    }
/*    @Override
    public void deleteUser(int userId) {
        appUserRepository.deleteById(userId);
    }*/

    @Override
    public void updateUser(Long userId, AppUserDTO userDTO) {
        AppUserEntity user = appUserRepository.findById(Math.toIntExact(userId))
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setUserType(userDTO.getUser_type());

        appUserRepository.save(user);
    }

}