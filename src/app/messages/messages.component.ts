import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  public showMessages = false;

  errors$: Observable<string[]>

  constructor(public messagesService: MessagesService) {
    console.log("Create messages service");
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(
      tap (() => {this.showMessages = true, console.log(this.showMessages)})
    )
  }

  onClose() {
    this.showMessages = false;
  }
}
