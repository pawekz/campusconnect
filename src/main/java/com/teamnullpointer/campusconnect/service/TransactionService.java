package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.entity.TransactionEntity;
import com.teamnullpointer.campusconnect.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<TransactionEntity> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<TransactionEntity> getTransactionById(int id) {
        return transactionRepository.findById(id);
    }

    public TransactionEntity createTransaction(TransactionEntity transaction) {
        return transactionRepository.save(transaction);
    }

    public TransactionEntity updateTransaction(int id, TransactionEntity transactionDetails) {
        // Fetch the transaction, throw an exception if not found
        TransactionEntity transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));

        // Update fields
        transaction.setUser(transactionDetails.getUser());
        transaction.setTransactionDetails(transactionDetails.getTransactionDetails());

        // Save and return the updated transaction
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(int id) {
        if (transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
        } else {
            throw new RuntimeException("Transaction not found with id: " + id);
        }
    }
}
