package com.teamnullpointer.campusconnect.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class CategoryCount {
    private String category;
    private Long count;

    // Constructors
    public CategoryCount() {}

    public CategoryCount(String category, Long count) {
        this.category = category;
        this.count = count;
    }

    // Getters and setters
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Long getCount() { return count; }
    public void setCount(Long count) { this.count = count; }
}
