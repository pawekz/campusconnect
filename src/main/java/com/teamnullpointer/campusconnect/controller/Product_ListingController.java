package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.entity.AppUserEntity;
import com.teamnullpointer.campusconnect.entity.Product_ListingEntity;
import com.teamnullpointer.campusconnect.service.Product_ListingService;
import com.teamnullpointer.campusconnect.service.AppUserService;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/API/productlisting")
@CrossOrigin(origins = "http://localhost:5173")
public class Product_ListingController {

    private static final Logger logger = LoggerFactory.getLogger(Product_ListingController.class);
    @Autowired
    private AppUserService appUserService;

    @Autowired
    private Product_ListingService service;

    @GetMapping("/all")
    public List<Product_ListingEntity> getAllProducts() {
        logger.debug("Request received for getAllProducts");
        logger.debug("Authorization header: {}", SecurityContextHolder.getContext().getAuthentication());
        logger.debug("User authorities: {}", SecurityContextHolder.getContext().getAuthentication().getAuthorities());

        List<Product_ListingEntity> products = service.getAllProducts();
        logger.debug("Retrieved {} products", products.size());

        return products;
    }

    @GetMapping("/{id}")
    public Optional<Product_ListingEntity> getProductById(@PathVariable int id) {
        return service.getProductById(id);
    }

    @PostMapping("/create")
    public Product_ListingEntity createProduct(
            @RequestParam("userId") int userId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("productData") String productDataJson) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Product_ListingEntity product = mapper.readValue(productDataJson, Product_ListingEntity.class);

        // Get the project root directory
        String projectDir = System.getProperty("user.dir");
        String uploadDir = projectDir + "/campusconnect-react/src/assets/productImage/";

        // Create directory if it doesn't exist
        // Create directory if it doesn't exist
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            boolean dirCreated = directory.mkdirs();
            if (!dirCreated) {
                throw new IOException("Failed to create directory: " + uploadDir);
            }
        }

        // Save the file
        String fileName = file.getOriginalFilename();
        String filePath = uploadDir + fileName;
        file.transferTo(new File(filePath));

        // Set the relative path for database storage
        // Use the existing image field
        product.setImage("/src/assets/productImage/" + fileName);


        // Fetch user and set it
        AppUserEntity user = appUserService.getUserById((long) userId);
        product.setUser(user);

        return service.createProduct(product, product.getImage());

    }


    @PutMapping("/{id}")
    public Product_ListingEntity updateProduct(@PathVariable int id, @RequestBody Product_ListingEntity productDetails) {
        return service.updateProductDetails(id, productDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        service.deleteProduct(id);
    }
}
