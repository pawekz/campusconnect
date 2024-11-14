package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.DTO.AppUserDTO;
import com.teamnullpointer.campusconnect.DTO.CategoryCountDTO;
import com.teamnullpointer.campusconnect.DTO.PlatformStatsDTO;
import com.teamnullpointer.campusconnect.entity.AdminDashboardEntity;
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
        AdminDashboardEntity entity = adminDashboardEntities.get(0);

        List<CategoryCountDTO> popularCategoriesWithCount = entity.getPopularCategoriesWithCount();
        long totalUsers = appUserRepository.count();
        long totalTransactions = transactionRepository.count();

        PlatformStatsDTO platformStatsDTO = new PlatformStatsDTO();
        platformStatsDTO.setId(entity.getId());
        platformStatsDTO.setActiveListing(entity.getActiveListing());
        platformStatsDTO.setPopularCategoriesWithCount(popularCategoriesWithCount);
        platformStatsDTO.setTotalUsers(totalUsers);
        platformStatsDTO.setTotalTransactions(totalTransactions);

        return platformStatsDTO;
    }

    public void manageUsers() {

    }
    public Page<AppUserDTO> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return appUserService.getAllUsersWithPagination(pageable);
    }

    public void moderateContent() {
        // Implement logic to moderate content
    }
}