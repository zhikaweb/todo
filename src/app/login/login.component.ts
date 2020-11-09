import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HardcodedAuthenticationService} from "../service/hardcoded-authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //defautl values
  username = 'svetoolya';
  password = '';
  errorMessage= 'Invalid Credentials';
  invalidLogin = false;

  //creating instance router
  //Angular.giveMeRouter
  //Dependency Injection

  //сначала мы сделали просто через роутер, а после создания сервиса добавляем иньекцию сервиса
  //constructor(private router: Router) { }
  constructor(private router: Router, private hardcodedAuthenticationService: HardcodedAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    // console.log(this.username);
    // console.log(this.password);
    //if(this.username==='svetoolya' && this.password === 'zhikaweb'){
    if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)){
      //redirect to welcome page
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }


}
