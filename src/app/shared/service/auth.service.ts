import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private api = 'https://ganeshpro1-production.up.railway.app/api/auth';
// private api = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) { }

  login(email: string): any {

    const data = localStorage.getItem('user');

    console.log('Raw Data:', data);

    if (!data) {
      return null;
    }

    const user = JSON.parse(data);

    console.log('Saved User:', user);
    console.log('Entered Email:', email);

    if (
      user.email.trim().toLowerCase() ===
      email.trim().toLowerCase()
    ) {
      return user;
    }

    return null;
  }

  // Send OTP
  sendOtp(email: string): Observable<any> {
    
    return this.http.post(`${this.api}/send-otp`, {
      email
    });
  }

  // Verify OTP
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.api}/verify-otp`, {
      email,
      otp
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }

}