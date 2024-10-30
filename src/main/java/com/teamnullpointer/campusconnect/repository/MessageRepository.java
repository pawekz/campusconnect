package com.teamnullpointer.campusconnect.repository;

import com.teamnullpointer.campusconnect.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<MessageEntity, Integer> {
}
