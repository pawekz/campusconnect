package com.teamnullpointer.campusconnect.repository;

import com.teamnullpointer.campusconnect.entity.AnalyticsHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnalyticsHistoryRepository extends JpaRepository<AnalyticsHistoryEntity, Integer> {
    List<AnalyticsHistoryEntity> findByUserId(int userId);
}