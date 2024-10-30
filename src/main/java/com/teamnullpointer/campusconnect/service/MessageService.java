package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.entity.MessageEntity;
import com.teamnullpointer.campusconnect.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public Iterable<MessageEntity> getMessageRecords() {
        return messageRepository.findAll();
    }

    public MessageEntity postMessageRecord(MessageEntity message) {
        return messageRepository.save(message);
    }

    public MessageEntity putMessageRecord(int id, MessageEntity newMessage) {
        MessageEntity message = messageRepository.findById(id).get();
        message.setMessage(newMessage.getMessage());
        message.setSender(newMessage.getSender());
        message.setReceiver(newMessage.getReceiver());
        return messageRepository.save(message);
    }

    public String deleteMessageRecord(int id) {
        messageRepository.deleteById(id);
        return "Message Record Deleted";
    }
}