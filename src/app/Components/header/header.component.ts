import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_Services/user-auth.service';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  userName: string | undefined;
  constructor(private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService) { }

  ngOnInit(): void {

  }
  getLoggedInUsername(): string | null {
    return localStorage.getItem('username');
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }
  toggleSidenav(): void {
    this.sidenav.toggle();
  }
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);

  }

  hasReceptionistRole(): boolean {
    const roles: { roleName: string }[] = this.userAuthService.getRoles() || [];//It will take role of current user
    return roles.some(role => role.roleName === 'ROLE_RECEPTIONIST');//from array of roles if current user role matches it will return true
  }

  hasOwnerRole(): boolean {
    const roles: { roleName: string }[] = this.userAuthService.getRoles() || [];
    return roles.some(role => role.roleName === 'ROLE_OWNER');
  }
  hasManagerRole(): boolean {
    const roles: { roleName: string }[] = this.userAuthService.getRoles() || [];
    return roles.some(role => role.roleName === 'ROLE_MANAGER');
  }

}
