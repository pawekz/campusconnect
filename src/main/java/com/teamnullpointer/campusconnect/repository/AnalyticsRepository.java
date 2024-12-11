package com.teamnullpointer.campusconnect.repository;

import com.teamnullpointer.campusconnect.entity.AnalyticsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnalyticsRepository extends JpaRepository<AnalyticsEntity, Integer> {
    AnalyticsEntity findByUserId(int userId);

    @Query(value = "SELECT COUNT(*) FROM product_listing WHERE MONTH(created_at) = ?1 AND YEAR(created_at) = YEAR(CURRENT_DATE)", nativeQuery = true)
    Integer findCountByMonth(int month);
}