package com.teamnullpointer.campusconnect.controller;

import com.teamnullpointer.campusconnect.entity.MessageEntity;
import com.teamnullpointer.campusconnect.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

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
}