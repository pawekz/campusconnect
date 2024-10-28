package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.entity.AnalyticsEntity;
import com.teamnullpointer.campusconnect.repository.AnalyticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AnalyticsService {

    @Autowired
    private AnalyticsRepository repository;

    public void updateStats(int userId, int itemsSold, BigDecimal totalEarnings) {
        AnalyticsEntity analytics = repository.findById(userId).orElse(new AnalyticsEntity());
        analytics.setUserId(userId);
        analytics.setItemsSold(itemsSold);
        analytics.setTotalEarnings(totalEarnings);
        repository.save(analytics);
    }

    public String generateReport(int userId) {
        AnalyticsEntity analytics = repository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return "User ID: " + analytics.getUserId() + ", Items Sold: " + analytics.getItemsSold() + ", Total Earnings: " + analytics.getTotalEarnings();
    }

    public List<AnalyticsEntity> getActiveListing() {
        // Implement logic to get active listings
        return repository.findAll();
    }

    public List<String> getPopularCategories() {
        // Implement logic to get popular categories
        return List.of("Category1", "Category2");
    }
}