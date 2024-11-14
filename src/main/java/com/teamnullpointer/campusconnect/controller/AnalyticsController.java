package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.entity.AnalyticsEntity;
import com.teamnullpointer.campusconnect.entity.AnalyticsHistoryEntity;
import com.teamnullpointer.campusconnect.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService service;

    @GetMapping("/test")
    public String test() {
        return "You're Accessing the Index Controller";
    }

    @PutMapping("/updateStats")
    public void updateStats(@RequestParam int userId, @RequestParam int itemsSold, @RequestParam BigDecimal totalEarnings) {
        service.updateStats(userId, itemsSold, totalEarnings);
    }

    @GetMapping("/generateReport/{userId}")
    public String generateReport(@PathVariable int userId) {
        return service.generateReport(userId);
    }

    @GetMapping("/all")
    public List<AnalyticsEntity> getAllAnalytics() {
        return service.getAllAnalytics();
    }

    @GetMapping("/history/{userId}")
    public List<AnalyticsHistoryEntity> getHistory(@PathVariable int userId) {
        return service.getHistory(userId);
    }
}