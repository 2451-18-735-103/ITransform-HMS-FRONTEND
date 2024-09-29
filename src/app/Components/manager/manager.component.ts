import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {


  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  getLoggedInUsername(): string | null {
    return localStorage.getItem('username');
  }

}

