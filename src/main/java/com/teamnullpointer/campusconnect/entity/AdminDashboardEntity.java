package com.teamnullpointer.campusconnect.entity;

import com.teamnullpointer.campusconnect.DTO.CategoryCountDTO;
import jakarta.persistence.*;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<CategoryCountDTO> getPopularCategoriesWithCount() {
        return popularCategories.stream()
                .map(category -> {
                    String[] parts = category.split(" \\(");
                    String name = parts[0];
                    int count = Integer.parseInt(parts[1].replace(")", ""));
                    return new CategoryCountDTO(name, count);
                })
                .collect(Collectors.toList());
    }

    public void setPopularCategoriesWithCount(List<CategoryCountDTO> popularCategoriesWithCount) {
        this.popularCategories = popularCategoriesWithCount.stream()
                .map(categoryCountDTO -> categoryCountDTO.getCategory() + " (" + categoryCountDTO.getCount() + ")")
                .collect(Collectors.toList());
    }
}