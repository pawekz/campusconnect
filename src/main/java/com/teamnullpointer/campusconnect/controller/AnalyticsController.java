package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService service;

    @PostMapping("/updateStats")
    public void updateStats(@RequestParam int userId, @RequestParam int itemsSold, @RequestParam BigDecimal totalEarnings) {
        service.updateStats(userId, itemsSold, totalEarnings);
    }

    @GetMapping("/generateReport/{userId}")
    public String generateReport(@PathVariable int userId) {
        return service.generateReport(userId);
    }

    @GetMapping("/activeListing")
    public List<?> getActiveListing() {
        return service.getActiveListing();
    }

    @GetMapping("/popularCategories")
    public List<String> getPopularCategories() {
        return service.getPopularCategories();
    }
}