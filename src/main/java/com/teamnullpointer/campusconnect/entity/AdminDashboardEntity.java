package com.teamnullpointer.campusconnect.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "admindashboard", schema = "campusconnect")
public class AdminDashboardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "active_listing")
    private int activeListing;

    @ElementCollection
    @CollectionTable(name = "popular_categories", joinColumns = @JoinColumn(name = "admindashboard_id"))
    @Column(name = "category")
    private List<String> popularCategories;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getActiveListing() {
        return activeListing;
    }

    public void setActiveListing(int activeListing) {
        this.activeListing = activeListing;
    }

    public List<String> getPopularCategories() {
        return popularCategories;
    }

    public void setPopularCategories(List<String> popularCategories) {
        this.popularCategories = popularCategories;
    }
}