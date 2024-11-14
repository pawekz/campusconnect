package com.teamnullpointer.campusconnect.repository;

import com.teamnullpointer.campusconnect.entity.AnalyticsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalyticsRepository extends JpaRepository<AnalyticsEntity, Integer> {
    AnalyticsEntity findByUserId(int userId);
}