
package com.teamnullpointer.campusconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<MessageEntity, Integer> {
    public MessageEntity findByUser(String user);
}


