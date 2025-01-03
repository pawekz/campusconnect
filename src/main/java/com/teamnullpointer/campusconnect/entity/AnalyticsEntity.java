package com.teamnullpointer.campusconnect.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "analytics", schema = "campusconnect")
public class AnalyticsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "items_sold")
    private int itemsSold;

    @Column(name = "total_earnings")
    private BigDecimal totalEarnings;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Add getter and setter for createdAt
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }



    public int getId() {

        return id;
    }

    public void setId(int id) {

        this.id = id;
    }

    public int getUserId() {

        return userId;
    }

    public void setUserId(int userId) {

        this.userId = userId;
    }

    public int getItemsSold() {

        return itemsSold;
    }

    public void setItemsSold(int itemsSold) {

        this.itemsSold = itemsSold;
    }

    public BigDecimal getTotalEarnings() {

        return totalEarnings;
    }

    public void setTotalEarnings(BigDecimal totalEarnings) {

        this.totalEarnings = totalEarnings;
    }
}