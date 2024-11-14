package com.teamnullpointer.campusconnect.DTO;

import com.teamnullpointer.campusconnect.entity.AppUserEntity;

import java.io.Serializable;

/**
 * DTO for {@link AppUserEntity}
 */

public class AppUserDTO implements Serializable {
    private int id;
    private String email;
    private String password;
    private String name;
    private String user_type;

    public AppUserDTO(int id, String email, String password, String name, String user_type) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.user_type = user_type;
    }

    public AppUserDTO(){}

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getUser_type() {
        return user_type;
    }


    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "email = " + email + ", " +
                "password = " + password + ", " +
                "name = " + name + ", " +
                "user_type = " + user_type + ")";
    }
}

//reupload