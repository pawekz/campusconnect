package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.DTO.TransactionRequestDTO;
import com.teamnullpointer.campusconnect.entity.TransactionEntity;
import com.teamnullpointer.campusconnect.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public List<TransactionEntity> getAllTransactions() {

        return transactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public Optional<TransactionEntity> getTransactionById(@PathVariable int id) {
        return transactionService.getTransactionById(id);
    }

    @PostMapping
    public TransactionEntity createTransaction(@RequestBody TransactionRequestDTO transactionRequestDTO) {
        return transactionService.createTransaction(transactionRequestDTO);
    }

    @PutMapping("/{id}")
    public TransactionEntity updateTransaction(@PathVariable int id, @RequestBody TransactionEntity transactionDetails) {
        return transactionService.updateTransaction(id, transactionDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable int id) {

        transactionService.deleteTransaction(id);
    }
}