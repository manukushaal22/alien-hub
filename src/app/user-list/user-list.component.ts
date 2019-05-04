import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[];

  constructor(chat: ChatServiceService) {
    chat.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}