package com.teamnullpointer.campusconnect.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "transactions")
public class TransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private AppUserEntity user;

    @OneToOne
    @JoinColumn(name = "product_listing_id", referencedColumnName = "id")
    private Product_ListingEntity productListing;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "status")
    private String status;

    @Column(name = "transaction_details")
    private String transactionDetails;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        status = "PENDING";
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }

    // Keep only the relevant getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public AppUserEntity getUser() {
        return user;
    }

    public void setUser(AppUserEntity user) {
        this.user = user;
    }

    public Product_ListingEntity getProductListing() {
        return productListing;
    }

    public void setProductListing(Product_ListingEntity productListing) {
        this.productListing = productListing;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTransactionDetails() {
        return transactionDetails;
    }

    public void setTransactionDetails(String transactionDetails) {
        this.transactionDetails = transactionDetails;
    }
}
