import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {ContactMessage} from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(private http: HttpClient) {
  }

  sendMessage(message: ContactMessage): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Access-Key': environment.jsonBin.secret,
    });
    // Ensure the message has a createdAt property
    const messageWithDate = {
      ...message,
      createdAt: message.createdAt || new Date().toISOString() // Default to current timestamp if no createdAt is provided
    };
    return this.http.get<any>(environment.jsonBin.bins.contactMessagesBin.url, {headers}).pipe(
      switchMap((response: any) => {
        // If the bin is empty or not an array, start a new array
        let messages: ContactMessage[] = [];
        if (Array.isArray(response?.record)) {
          messages = response.record;
        } else if (Array.isArray(response?.record?.messages)) {
          messages = response.record.messages;
        } else if (Array.isArray(response)) {
          messages = response;
        } else if (Array.isArray(response?.messages)) {
          messages = response.messages;
        }
        // Only add the new message if it is not a duplicate (ignore createdAt)
        const isDuplicate = messages.some(m =>
          m.email === messageWithDate.email &&
          m.message === messageWithDate.message
        );
        // Remove any 'date' property and ensure 'createdAt' is present
        const cleanedMessages = messages.map((msg: any) => {
          const {date, ...rest} = msg;
          return {
            ...rest,
            createdAt: msg.createdAt || new Date().toISOString()
          };
        });
        // Prepare the new message with createdAt
        const cleanedMessageWithCreatedAt = {
          ...messageWithDate,
          createdAt: new Date().toISOString()
        };
        const updatedMessages = isDuplicate ? cleanedMessages : [...cleanedMessages, cleanedMessageWithCreatedAt];
        return this.http.put(
          environment.jsonBin.bins.contactMessagesBin.url,
          updatedMessages,
          {headers}
        );
      })
    );
  }

  getAllMessages(): Observable<ContactMessage[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Access-Key': environment.jsonBin.secret,
    });
    return this.http.get<any>(environment.jsonBin.bins.contactMessagesBin.url, {headers})
      .pipe(
        switchMap((response: any) => {
          let messages: ContactMessage[] = [];
          if (Array.isArray(response?.record)) {
            messages = response.record;
          } else if (Array.isArray(response?.record?.messages)) {
            messages = response.record.messages;
          } else if (Array.isArray(response)) {
            messages = response;
          } else if (Array.isArray(response?.messages)) {
            messages = response.messages;
          }
          return [messages];
        })
      );
  }
}
