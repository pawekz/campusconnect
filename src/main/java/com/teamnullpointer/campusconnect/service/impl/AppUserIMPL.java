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

    @Override
    public LoginResponse loginAppUser(LoginDTO loginDTO) {
        AppUserEntity appUser1 = appUserRepository.findByEmail(loginDTO.getEmail());

        if (appUser1 != null) {
            String password = appUser1.getPassword();
            String enteredPassword = loginDTO.getPassword();
            Boolean isPasswordMatch = passwordEncoder.matches(enteredPassword, password);
            if (isPasswordMatch) {
                return new LoginResponse("Login Successful", true);
            } else {
                return new LoginResponse("Login Failed", false);
            }
        } else {
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


/*    @Override
    public void deleteUser(int userId) {
        appUserRepository.deleteById(userId);
    }*/
}