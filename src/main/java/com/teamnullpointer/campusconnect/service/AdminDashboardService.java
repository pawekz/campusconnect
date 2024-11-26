package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.CategoryCountDTO;
import com.teamnullpointer.campusconnect.DTO.PlatformStatsDTO;
import com.teamnullpointer.campusconnect.entity.AdminDashboardEntity;
import com.teamnullpointer.campusconnect.entity.AppUserEntity;
import com.teamnullpointer.campusconnect.repository.AdminDashboardRepository;
import com.teamnullpointer.campusconnect.repository.AppUserRepository;
import com.teamnullpointer.campusconnect.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
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
    List<AdminDashboardEntity> adminDashboardEntities = adminDashboardRepository.findAll();
    PlatformStatsDTO platformStatsDTO = new PlatformStatsDTO();

    if (!adminDashboardEntities.isEmpty()) {
        AdminDashboardEntity entity = adminDashboardEntities.get(0);
        List<CategoryCountDTO> popularCategoriesWithCount = entity.getPopularCategoriesWithCount();
        platformStatsDTO.setId(entity.getId());
        platformStatsDTO.setActiveListing(entity.getActiveListing());
        platformStatsDTO.setPopularCategoriesWithCount(popularCategoriesWithCount);
    }

    long totalUsers = appUserRepository.count();
    long totalTransactions = transactionRepository.count();
    platformStatsDTO.setTotalUsers(totalUsers);
    platformStatsDTO.setTotalTransactions(totalTransactions);

    return platformStatsDTO;
}

    public void manageUsers() {

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
}