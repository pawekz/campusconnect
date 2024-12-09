package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.CategoryCountDTO;
import com.teamnullpointer.campusconnect.DTO.PlatformStatsDTO;
import com.teamnullpointer.campusconnect.entity.AdminDashboardEntity;
import com.teamnullpointer.campusconnect.entity.AppUserEntity;
import com.teamnullpointer.campusconnect.entity.Product_ListingEntity;
import com.teamnullpointer.campusconnect.repository.AdminDashboardRepository;
import com.teamnullpointer.campusconnect.repository.AppUserRepository;
import com.teamnullpointer.campusconnect.repository.Product_ListingRepository;
import com.teamnullpointer.campusconnect.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminDashboardService {

    @Autowired
    private AdminDashboardRepository adminDashboardRepository;

    @Autowired
    private AppUserRepository appUserRepository;



    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    @Qualifier("appUserService")
    private AppUserService appUserService;

    public PlatformStatsDTO viewPlatformStats() {
        PlatformStatsDTO platformStatsDTO = new PlatformStatsDTO();

        // Get actual count of listings
        long activeListings = productListingRepository.count();
        platformStatsDTO.setActiveListing((int)activeListings);

        // Get category counts
        List<CategoryCountDTO> categoryStats = calculatePopularCategories();
        platformStatsDTO.setPopularCategoriesWithCount(categoryStats);

        // Get other stats
        long totalUsers = appUserRepository.count();
        long totalTransactions = transactionRepository.count();
        platformStatsDTO.setTotalUsers(totalUsers);
        platformStatsDTO.setTotalTransactions(totalTransactions);

        return platformStatsDTO;
    }


public List<AppUserDTO> getAllUsers() {
    List<AppUserEntity> users = appUserRepository.findAll();
    return users.stream()
        .map(user -> new AppUserDTO(
            user.getId(),
            user.getEmail(),
            null,
            user.getName(),
            user.getUserType()
        ))
        .collect(Collectors.toList());
}

    public void moderateContent() {
        // Implement logic to moderate content
    }

    // Add to AdminDashboardService
    @Autowired
    private Product_ListingRepository productListingRepository;

    private List<CategoryCountDTO> calculatePopularCategories() {
        List<Product_ListingEntity> products = productListingRepository.findAll();
        Map<String, Long> categoryCounts = products.stream()
                .collect(Collectors.groupingBy(
                        Product_ListingEntity::getCategory,
                        Collectors.counting()
                ));

        return categoryCounts.entrySet().stream()
                .map(entry -> new CategoryCountDTO(entry.getKey(), entry.getValue().intValue()))
                .collect(Collectors.toList());
    }

}