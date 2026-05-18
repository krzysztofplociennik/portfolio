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
      device: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      browser: this.getBrowser()
    };

    this.http.post('/api/notify', payload).subscribe();
  }

  private getBrowser(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }
}
