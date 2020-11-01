import { Component, OnInit } from '@angular/core';
import { LoginLogService } from '../../service/login-log.service';

@Component({
  selector: 'app-login-log',
  templateUrl: './login-log.component.html',
  styleUrls: ['./login-log.component.css']
})
export class LoginLogComponent implements OnInit {

  constructor(private service: LoginLogService) { }
  loginLogs: any[];

  ngOnInit(): void {
    this.service.list().subscribe(res=>this.loginLogs=res._embedded.swdLoginLogs);
  }

}
