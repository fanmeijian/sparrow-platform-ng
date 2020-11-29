import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formControl = new FormControl();
  user: any;
  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.user = new Object();
    this.user.username = "sysadmin";
    this.user.password = "password";
  }

  login() {
    this.service.login(this.user).subscribe(res => {   
      localStorage.setItem("idToken", res.data);
      localStorage.setItem("username", this.user.username);     
      this.router.navigateByUrl("/dashboard").then(()=>{window.location.reload()});
    });  
  }  
}
