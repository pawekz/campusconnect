package com.teamnullpointer.campusconnect.DTO;

import java.util.List;

public class PlatformStatsDTO {
    private int id;
    private int activeListing;
    private List<CategoryCountDTO> popularCategoriesWithCount;
    private long totalUsers;
    private long totalTransactions;

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
        return popularCategoriesWithCount;
    }

    public void setPopularCategoriesWithCount(List<CategoryCountDTO> popularCategoriesWithCount) {
        this.popularCategoriesWithCount = popularCategoriesWithCount;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }
}
//reupload