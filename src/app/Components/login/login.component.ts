import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserAuthService } from 'src/app/_Services/user-auth.service';
import { UserService } from 'src/app/_Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true;

  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router) {

  }
  ngOnInit(): void {

  }
  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response.accessToken);
        console.log(response.roles);
        console.log(response.password);
        console.log(response.username);
        console.log(response.email);

        this.userAuthService.setRoles(response.roles),
          this.userAuthService.setToken(response.accessToken);
        localStorage.setItem('username', response.username);
        sessionStorage.setItem('token', response.accessToken);
        const role = response.roles[0];
        if (role === 'ROLE_MANAGER') {
          this.router.navigate(['/manager']);
        }
        else if (role == 'ROLE_RECEPTIONIST') {
          this.router.navigate(['/receptionist']);
        }
        else {
          this.router.navigate(['/owner']);
        }
      },
      (error) => {
        console.log(error);

        if (error.status === 500) {

          Swal.fire({
            title: 'Invalid Credentials',
            text: 'The provided username or password is incorrect. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'

          });
          loginForm.resetForm();
        }
        else if (error.status === 400) {

          Swal.fire({
            title: 'User already taken',
            text: 'The provided username or email is already taken. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          loginForm.resetForm();
        }
      }
    );
  }

  public registerUser() {
    this.router.navigate(['/register']);
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
