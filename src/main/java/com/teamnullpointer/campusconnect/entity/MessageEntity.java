package com.teamnullpointer.campusconnect.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private AppUserEntity user;

    private int sender_id;
    private int receiver_id;
    private String content;
    private LocalDateTime sent_at;

    public MessageEntity() {
    }

    public MessageEntity(int id, int sender_id, int receiver_id, String content, LocalDateTime sent_at) {
        this.id = id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.content = content;
        this.sent_at = sent_at;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSender_id() {
        return sender_id;
    }

    public void setSender_id(int sender_id) {
        this.sender_id = sender_id;
    }

    public int getReceiver_id() {
        return receiver_id;
    }

    public void setReceiver_id(int receiver_id) {
        this.receiver_id = receiver_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getSent_at() {
        return sent_at;
    }

    public void setSent_at(LocalDateTime sent_at) {
        this.sent_at = sent_at;
    }
}