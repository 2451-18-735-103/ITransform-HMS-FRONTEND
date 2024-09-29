import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css']
})
export class ReceptionistComponent implements OnInit{

  message!: string;
  constructor(private userService:UserService){}

  ngOnInit(): void {
    
  }
  

}
