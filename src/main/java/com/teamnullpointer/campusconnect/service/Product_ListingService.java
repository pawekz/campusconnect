package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.entity.Product_ListingEntity;
import com.teamnullpointer.campusconnect.repository.Product_ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

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

    public Product_ListingEntity createProduct(Product_ListingEntity product, String image) {
        product.setImage(image);
        return repository.save(product);
    }

    public Product_ListingEntity updateProductDetails(int id, Product_ListingEntity productDetails) {
        return repository.findById(id)
                .map(product -> {
                    product.setProduct_title(productDetails.getProduct_title());
                    product.setProduct_description(productDetails.getProduct_description());
                    product.setPrice(productDetails.getPrice());
                    product.setCategory(productDetails.getCategory());
                    return repository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public void deleteProduct(int id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Product not found with id: " + id);
        }
    }

    public List<Product_ListingEntity> getProductsByCategory(String category) {
        return repository.findByCategory(category);
    }
}
