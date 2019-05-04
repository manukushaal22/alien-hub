import { Component, OnInit, Input } from '@angular/core';
import { ChatServiceService } from '../chat-service.service';
import { AuthService } from '../auth.service';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownUser : string;

  constructor(private authService: AuthService) {
    authService.authUser().subscribe(user => {
      this.isOwnMessage = this.ownUser === this.userName;
    });
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userName = chatMessage.userName;
  }
}