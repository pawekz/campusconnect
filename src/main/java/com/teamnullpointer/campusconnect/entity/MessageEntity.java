package com.teamnullpointer.campusconnect.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "message_entity")
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

}
