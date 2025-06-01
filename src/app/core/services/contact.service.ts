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
    // Ensure the message has a date property
    const messageWithDate = {
      ...message,
      date: message.date || "N/A" // Default to "N/A" if no date is provided
    };
    return this.http.get<any>(environment.jsonBin.bins.contactMessagesBin.url, {headers}).pipe(
      switchMap((response: any) => {
        const messages: ContactMessage[] = Array.isArray(response?.record) ? response.record : [];
        const updatedMessages = [...messages, messageWithDate];
        return this.http.put(
          environment.jsonBin.bins.contactMessagesBin.url,
          updatedMessages,
          {headers}
        );
      })
    );
  }
}
