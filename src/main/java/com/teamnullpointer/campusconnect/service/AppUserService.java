package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.LoginDTO;
import com.teamnullpointer.campusconnect.entity.AppUserEntity;
import com.teamnullpointer.campusconnect.response.LoginResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface AppUserService {

    String addUser(AppUserDTO userDTO);

    LoginResponse loginAppUser(LoginDTO loginDTO);

    Page<AppUserDTO> getAllUsersWithPagination(Pageable pageable);

    void deleteUser(Long userId);

    void deleteUser(int userId);

    AppUserEntity findByEmail(String email);

    AppUserEntity getUserById(Long userId);
}