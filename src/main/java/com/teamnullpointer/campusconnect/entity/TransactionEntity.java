package com.teamnullpointer.campusconnect.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "transactions")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private String transactionDetails;

    // Getters and Setters
    public int getId() {

        return id;
    }

    public void setId(int id) {

        this.id = id;
    }

    public UserEntity getUser() {

        return user;
    }

    public void setUser(UserEntity user) {

        this.user = user;
    }

    public String getTransactionDetails() {

        return transactionDetails;
    }

    public void setTransactionDetails(String transactionDetails) {

        this.transactionDetails = transactionDetails;
    }
}