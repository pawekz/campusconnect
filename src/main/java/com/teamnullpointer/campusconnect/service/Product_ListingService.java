package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.entity.Product_ListingEntity;
import com.teamnullpointer.campusconnect.repository.Product_ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.teamnullpointer.campusconnect.controller.Product_ListingController.getProductListingEntity;

@Service
public class Product_ListingService {

    @Autowired
    private Product_ListingRepository repository;

    public List<Product_ListingEntity> getAllProducts() {
        return repository.findAll();
    }

    public Optional<Product_ListingEntity> getProductById(int id) {
        return repository.findById(id);
    }

    public Product_ListingEntity createProduct(Product_ListingEntity product) {
        return repository.save(product);
    }

    public Product_ListingEntity updateProduct(int id, Product_ListingEntity productDetails) {
        return getProductListingEntity(id, productDetails, repository);
    }

    public void deleteProduct(int id) {
        repository.deleteById(id);
    }
}