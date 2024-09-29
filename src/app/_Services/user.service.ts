import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path_of_api = "http://localhost:8909/";

  public userNameSubject = new BehaviorSubject<string>('');

  setUserName(userName: string) {
    this.userNameSubject.next(userName);
    console.log('User name set:', userName);
  }

  getUserName() {
    return this.userNameSubject.asObservable();
  }

  constructor(private httpClient: HttpClient,
    private userAuthService: UserAuthService,
    private router: Router) {

  }
  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );


  public login(loginData: any) {

    return this.httpClient.post(this.path_of_api + "auth/signin",
      loginData,
      { headers: this.requestHeader });
  }
  public register(registerData: any) {
    return this.httpClient.post(this.path_of_api + "auth/signup"
      , registerData);
  }

  public getUser(): Observable<any> | null {
    const token = this.userAuthService.getToken();
    if (token) {
      // Send a request to your backend API to get user details
      return this.httpClient.get(this.path_of_api + 'auth/signup', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      });
    }
    return null;
  }

  public roleMatch(allowedRoles: any): boolean {
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          
          if (userRoles[i].roleName === allowedRoles[j]) {

            return true;
          }
        }
      }
    }
    return false;
  }
  public logout() {

    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }
}
