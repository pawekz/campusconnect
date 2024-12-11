package com.teamnullpointer.campusconnect.service;

import com.teamnullpointer.campusconnect.entity.AppUserEntity;
import com.teamnullpointer.campusconnect.entity.MessageEntity;
import com.teamnullpointer.campusconnect.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

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
        MessageEntity message = messageRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Message with id " + id + " not found"));
        message.setContent(newMessage.getContent());
        message.setSender_id(newMessage.getSender_id());
        message.setReceiver_id(newMessage.getReceiver_id());
        message.setSent_at(newMessage.getSent_at());
        return messageRepository.save(message);
    }

    public String deleteMessageRecord(int id) {
        if (messageRepository.findById(id).isPresent()) {
            messageRepository.deleteById(id);
            return "Message Record Deleted";
        } else {
            throw new NoSuchElementException("Message with id " + id + " not found");
        }
    }

    public List<MessageEntity> getMessagesForUser(int userId) {
        return messageRepository.findBySenderIdOrReceiverId(userId, userId);
    }

    public MessageEntity sendMessage(int senderId, int receiverId, String content) {
        MessageEntity message = new MessageEntity();

        // Create references to sender and receiver AppUserEntity objects
        AppUserEntity sender = new AppUserEntity();
        sender.setId(senderId);

        AppUserEntity receiver = new AppUserEntity();
        receiver.setId(receiverId);

        // Set the relationships
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setSent_at(LocalDateTime.now());

        return messageRepository.save(message);
    }


    public List<MessageEntity> getChatHistoryBetweenUsers(int userId1, int userId2) {
        return messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(userId1, userId2, userId1, userId2);
    }

}