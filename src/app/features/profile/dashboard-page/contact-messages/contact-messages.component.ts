import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {NgForOf, NgIf} from '@angular/common';
import {ContactMessage} from '../../../../core/interfaces/contact';

@Component({
  selector: 'app-dashboard-contact-messages',
  standalone: true,
  templateUrl: './contact-messages.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./contact-messages.component.css']
})
export class ContactMessagesComponent implements OnInit {
  messages: ContactMessage[] = [];
  loading = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.get<any>(
      environment.jsonBin.bins.contactMessagesBin.url,
      {
        headers: {
          'X-Access-Key': environment.jsonBin.secret
        }
      })
      .subscribe(data => {
        let messages: ContactMessage[] = [];
        if (Array.isArray(data.record)) {
          messages = data.record;
        } else if (Array.isArray(data.record?.messages)) {
          messages = data.record.messages;
        }
        // Ensure each message has a date property
        this.messages = messages.map(msg => ({
          ...msg,
          date: msg.date || new Date().toISOString()
        }));
        this.loading = false;
      }, () => {
        this.messages = [];
        this.loading = false;
      });
  }

  deleteMessage(msg: ContactMessage): void {
    if (confirm(`Are you sure you want to delete this message from ${msg.name}?`)) {
      const updatedMessages = this.messages.filter(m => m !== msg);
      this.http.put(environment.jsonBin.bins.contactMessagesBin.url, {messages: updatedMessages}, {
        headers: {
          'X-Access-Key': environment.jsonBin.secret
        }
      }).subscribe({
        next: () => {
          this.messages = updatedMessages;
        },
        error: (err) => {
          alert('Failed to delete message. Please try again.');
        }
      });
    }
  }
}
