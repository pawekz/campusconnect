package com.teamnullpointer.campusconnect.repository;

import com.teamnullpointer.campusconnect.entity.Product_ListingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Product_ListingRepository extends JpaRepository<Product_ListingEntity, Integer> {
    // Additional query methods can be defined here if needed
    List<Product_ListingEntity> findByCategory(String category);
}
