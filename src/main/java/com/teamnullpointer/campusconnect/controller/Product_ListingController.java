package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.entity.Product_ListingEntity;
import com.teamnullpointer.campusconnect.service.Product_ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class Product_ListingController {

    @Autowired
    private Product_ListingService service;

    @GetMapping
    public List<Product_ListingEntity> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public Optional<Product_ListingEntity> getProductById(@PathVariable int id) {
        return service.getProductById(id);
    }

    @PostMapping
    public Product_ListingEntity createProduct(@RequestBody Product_ListingEntity product) {
        return service.createProduct(product);
    }

    @PostMapping("/uploadImage")
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        return service.uploadImage(file);
    }

    @PutMapping("/updateProduct/{id}")
    public Product_ListingEntity updateProduct(@PathVariable int id, @RequestBody Product_ListingEntity productDetails) {
        return service.updateProductDetails(id, productDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        service.deleteProduct(id);
    }
}