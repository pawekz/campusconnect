package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.LoginDTO;
import com.teamnullpointer.campusconnect.response.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public interface AppUserService {

    String addUser(AppUserDTO userDTO);

    LoginResponse loginAppUser(LoginDTO loginDTO);
}