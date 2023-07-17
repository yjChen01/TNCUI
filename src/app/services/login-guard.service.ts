import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environment';
import { throwError } from 'rxjs';
import { AuthenticationClient } from '../clients/authentication.client';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService {
  private tokenKey = 'token';

  constructor(private router: Router, private http: HttpClient) {}

  public login(username: string, password: string): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers,
    };

    let body = {
      user_name: username,
      user_password: password,
      user_mail: '',
    };
    this.http
      .post<any>(`${environment.api}/Login`, body, options)
      .subscribe((data_result) => {
        console.log(data_result);
        if (data_result==1) {
          localStorage.setItem('username',username);
          localStorage.setItem(this.tokenKey, 'fqoewifhoqeuifhoiudhvo');
          this.router.navigate(['/SystemStatus']);
        }
        else{
          alert('user not found, please register');
          this.router.navigate(['/Register']);
        }
      });
      // this.router.navigate(['/SystemStatus']);

  }

  public register(username: string, email: string, password: string): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers,
    };

    let body = {
      user_name: username,
      user_password: password,
      user_mail: email,
    };
    this.http
      .post<any>(`${environment.api}/Register`, body, options)
      .subscribe((data_result) => {
        console.log(data_result);
        if (data_result==1) {
          alert('Register success, please login');
          this.router.navigate(['/Login']);
        }
        else{
          alert('user name has repeated, please try another name');
          this.router.navigate(['/Register']);
        }
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
