package com.teamnullpointer.campusconnect.repository;

import com.teamnullpointer.campusconnect.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Integer> {
    List<MessageEntity> findBySenderIdOrReceiverId(int senderId, int receiverId);

    List<MessageEntity> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(int senderId1, int receiverId1, int senderId2, int receiverId2);

}