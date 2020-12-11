import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  public showMessages = false;
  public errors: string[];
  constructor() {}

  ngOnInit() {}

  onClose() {
    this.showMessages = false;
  }
}
