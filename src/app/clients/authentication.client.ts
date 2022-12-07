
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(name:string,pw:string): any{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = {
      headers,
    };

    let body = {
      "user_name":name,
      "user_password":pw,
    };
    this.http
      .post <any>('https://localhost:7285/Login', body, options)
      .subscribe((data_result) => {
        return data_result;
      });
  }

  // public login(username: string, password: string): Observable<string> {
  //   return this.http.post(
  //     'https://localhost:7285/Login',
  //     {
  //       user_name: username,
  //       user_password: password,
  //     },
  //     { responseType: 'text' }
  //   );
  // }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<string> {
    return this.http.post(
      'https://localhost:7285/register',
      {
        username: username,
        email: email,
        password: password,
      },
      { responseType: 'text' }
    );
  }
}
