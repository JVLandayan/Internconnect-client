import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user"));
  
  
  constructor(private Auth: AuthenticationService) { }

  ngOnInit(): void {
    
  }
  logout() {
      this.Auth.logout();
  }

}
