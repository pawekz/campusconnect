package com.teamnullpointer.campusconnect.repository;

import com.teamnullpointer.campusconnect.entity.Product_ListingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Product_ListingRepository extends JpaRepository<Product_ListingEntity, Integer> {


}