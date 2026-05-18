import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Visitor {

  constructor(private http: HttpClient) { }

  notifyVisit() {
    const payload = {
      referrer: document.referrer,
      language: navigator.language,
      device: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'
    };

    this.http.post('/api/notify', payload).subscribe();
  }
}
