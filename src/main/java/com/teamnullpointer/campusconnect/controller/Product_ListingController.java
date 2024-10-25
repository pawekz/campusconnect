package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.entity.Product_ListingEntity;
import com.teamnullpointer.campusconnect.repository.Product_ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
class Product_ListingController {

    @Autowired
    private Product_ListingRepository repository;

    @GetMapping
    public List<Product_ListingEntity> getAllProducts() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Product_ListingEntity> getProductById(@PathVariable int id) {
        return repository.findById(id);
    }

    @PostMapping
    public Product_ListingEntity createProduct(@RequestBody Product_ListingEntity product) {
        return repository.save(product);
    }

    @PutMapping("/{id}")
    public Product_ListingEntity updateProduct(@PathVariable int id, @RequestBody Product_ListingEntity productDetails) {
        Product_ListingEntity product = repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setUser_id(productDetails.getUser_id());
        product.setProduct_title(productDetails.getProduct_title());
        product.setProduct_description(productDetails.getProduct_description());
        product.setPrice(productDetails.getPrice());
        product.setCategory(productDetails.getCategory());
        return repository.save(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        repository.deleteById(id);
    }
}