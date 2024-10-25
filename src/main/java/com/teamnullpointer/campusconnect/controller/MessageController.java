package controller;

import com.teamnullpointer.campusconnect.entity.MessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping("/print")
    public String print() {return "Message Controller";}
        return messageService.getMessages();
}

@PostMapping("/postmessage")
public Iterable<MessageEntity> getMessages() {
    return messageService.getMessages();
}

@PutMapping("/putmessage")
public MessageEntity putMessage(@RequestParam int id, @RequestBody MessageEntity newMessage) throws NameNotFoundException {
    return messageService.putMessage(id, newMessage);
}

@DeleteMapping("/deletemessage/{id}")
public String deleteMessage(@PathVariable int id) {
    return messageService.deleteMessage(id);
}
}
