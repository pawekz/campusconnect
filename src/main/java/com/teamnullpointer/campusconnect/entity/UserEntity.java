package com.teamnullpointer.campusconnect.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class UserEntity {

    @Id
    private int id;
    private String email;
    private String password;
    private String name;
    private String user_type;


    public int getId() {

        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public String getName(){
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUser_type(){
        return user_type;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

}
