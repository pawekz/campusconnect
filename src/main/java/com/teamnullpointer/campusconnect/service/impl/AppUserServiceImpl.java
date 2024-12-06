package com.teamnullpointer.campusconnect.service.impl;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.LoginDTO;
import com.teamnullpointer.campusconnect.repository.AppUserRepository;
import com.teamnullpointer.campusconnect.response.LoginResponse;
import com.teamnullpointer.campusconnect.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public abstract class AppUserServiceImpl implements AppUserService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public String addUser(AppUserDTO userDTO) {
        // Implementation for adding user
        return "";
    }

    @Override
    public LoginResponse loginAppUser(LoginDTO loginDTO) {
        // Implementation for logging in user
        return null;
    }

    @Override
    public Page<AppUserDTO> getAllUsersWithPagination(Pageable pageable) {
        // Implementation for getting all users with pagination
        return null;
    }

    @Override
    public void deleteUser(Long userId) {
        // Implementation for deleting user by Long id

    }

    @Override
    public void deleteUser(int userId) {
        // Implementation for deleting user by int id
    }


/*   @Override
    public boolean isEmailInUse(String email) {
        return appUserRepository.existsByEmail( (email) );
    } */
}