package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.entity.AnalyticsEntity;
import com.teamnullpointer.campusconnect.entity.AnalyticsHistoryEntity;
import com.teamnullpointer.campusconnect.repository.AnalyticsHistoryRepository;
import com.teamnullpointer.campusconnect.repository.AnalyticsRepository;
import com.teamnullpointer.campusconnect.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private static final Logger logger = Logger.getLogger(AnalyticsService.class.getName());

    @Autowired
    private AnalyticsRepository repository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private AnalyticsHistoryRepository historyRepository;

    public void updateStats(int userId, int itemsSold, BigDecimal totalEarnings) {
        logger.info("Updating stats for userId: " + userId);
        AnalyticsEntity analytics = repository.findByUserId(userId);
        if (analytics == null) {
            analytics = new AnalyticsEntity();
            analytics.setUserId(userId);
        }
        analytics.setItemsSold(itemsSold);
        analytics.setTotalEarnings(totalEarnings);
        repository.save(analytics);

        // Save history
        AnalyticsHistoryEntity history = new AnalyticsHistoryEntity();
        history.setUserId(userId);
        history.setItemsSold(itemsSold);
        history.setTotalEarnings(totalEarnings);
        history.setTimestamp(LocalDateTime.now());
        historyRepository.save(history);

        logger.info("Stats updated for userId: " + userId);
    }


    public String generateReport(int userId) {
        logger.info("Generating report for userId: " + userId);
        try {
            AnalyticsEntity analytics = repository.findByUserId(userId);
            if (analytics == null) {
                logger.warning("No data available for userId: " + userId);
                return "No data available";
            }
            logger.info("Report generated for userId: " + userId);
            return "User ID: " + analytics.getUserId() + ", Items Sold: " + analytics.getItemsSold() + ", Total Earnings: " + analytics.getTotalEarnings();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error generating report for userId: " + userId, e);
            return "Error generating report: " + e.getMessage();
        }
    }

    public List<AnalyticsEntity> getAllAnalytics() {
        return repository.findAll();
    }

    public List<AnalyticsHistoryEntity> getHistory(int userId) {
        try {
            return historyRepository.findByUserId(userId);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error retrieving history for userId: " + userId, e);
            return null;
        }
    }

    public List<AppUserDTO> getUserIds() {
        return appUserRepository.findAll().stream()
                .map(user -> new AppUserDTO(user.getId(), user.getEmail(), user.getPassword(), user.getName(), user.getUserType()))
                .collect(Collectors.toList());
    }
}