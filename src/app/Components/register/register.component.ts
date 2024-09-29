import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/_Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hidePassword: boolean = true;
  constructor(private userService: UserService,
    private router: Router) { }
  ngOnInit(): void {

  }


  register(registerForm: NgForm) {
    this.userService.register(registerForm.value).subscribe(
      (response: any) => {

        if (response) {
          registerForm.resetForm();

          Swal.fire({
            title: 'Success!',
            text: 'Registration successful!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
        }
      },
      (error) => {
        if (error.status == 400) {
          Swal.fire({
            title: "Username or Email is already taken!!!",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
        }
        console.log(error);

        registerForm.reset();

      }
    );
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}








