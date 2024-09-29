import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []) {
    const rolesWithRoleName = roles.map(
      role => ({ roleName: role }));
    localStorage.setItem("roles", JSON.stringify(rolesWithRoleName));
  }


  public getRoles(): [] | null {
    const rolesJson = localStorage.getItem("roles");
    return rolesJson ? JSON.parse(rolesJson) : null;
  }


  public setToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
    console.log("Token set in localStorage:", accessToken);
    sessionStorage.setItem("token", accessToken);
  }

  public getToken(): any {
    const accessToken = localStorage.getItem("accessToken");
    // console.log("Token retrieved from localStorage:", accessToken);
    return accessToken;
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }


}
