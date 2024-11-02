package com.teamnullpointer.campusconnect.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class AppUserEntity {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "password", length = 255)
    private String password; //this serves as the `username`

    @Column (name = "name", length = 128)
    private String name; //name of the Student or Admin

    @Column(name = "user_type", length = 32)
    private String user_type; //name of the user type (Student or Admin)

    public AppUserEntity() {
    }

    public AppUserEntity(int id, String email, String password, String name, String user_type) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.user_type = user_type;
    }

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

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUser_type() {
        return user_type;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", user_type='" + user_type + '\'' +
                '}';
    }
}