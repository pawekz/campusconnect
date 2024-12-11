package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.entity.MessageEntity;
import com.teamnullpointer.campusconnect.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
/*import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;*/
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/getmessagerecords")
    public Iterable<MessageEntity> getMessageRecords() {
        return messageService.getMessageRecords();
    }

    @PostMapping("/postmessagerecord")
    public MessageEntity postMessageRecord(@RequestBody MessageEntity message) {
        return messageService.postMessageRecord(message);
    }

    @PutMapping("/putmessagerecord")
    public MessageEntity putMessageRecord(@RequestParam int id, @RequestBody MessageEntity newMessage) {
        return messageService.putMessageRecord(id, newMessage);
    }

    @DeleteMapping("/deletemessagerecord/{id}")
    public String deleteMessageRecord(@PathVariable int id) {
        return messageService.deleteMessageRecord(id);
    }

    @GetMapping("/conversations/{userId}")
    public ResponseEntity<List<MessageEntity>> getUserConversations(@PathVariable int userId) {
        return ResponseEntity.ok(messageService.getMessagesForUser(userId));
    }

    @GetMapping("/history")
    public ResponseEntity<List<MessageEntity>> getChatHistory(
            @RequestParam int userId1,
            @RequestParam int userId2) {
        return ResponseEntity.ok(messageService.getChatHistoryBetweenUsers(userId1, userId2));
    }

    @PostMapping("/send")
    public ResponseEntity<MessageEntity> sendMessage(@RequestBody MessageEntity message) {
        MessageEntity savedMessage = messageService.sendMessage(
                message.getSender_id(),
                message.getReceiver_id(),
                message.getContent()
        );
        return ResponseEntity.ok(savedMessage);
    }
}