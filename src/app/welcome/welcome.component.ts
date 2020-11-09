import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WelcomeDataService} from "../service/data/welcome-data.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  //Inject of ActivatedRoute - принимает параметры пути, пихаем его в конструктор
  messageFromService:string;
  name = '';

  constructor(private route: ActivatedRoute, private welcomeDataService: WelcomeDataService) { }

  ngOnInit(): void {
    //инициализируем методы объекта route
    //console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name'];
  }

  getMessage() {
    // console.log(this.welcomeDataService.executeHelloWorldBeanService());
    this.welcomeDataService.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error),
    );
    //this.welcomeDataService.executeHelloWorldBeanService();
    // console.log("Hello!");
    // console.log('last line of message');
  }

  getMessageWithParam() {
    this.welcomeDataService.executeHelloWorldServicePath(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error),
    );

  }

  handleSuccessfulResponse(response){
    // console.log(response.message);
    this.messageFromService = response.message;
  }

  //создаем метод обработки ошибок
  handleErrorResponse(error){
    //обрабатываем нашу переменную
    // console.log(error);
    // console.log(error.error);
    // console.log(error.error.message);
    this.messageFromService = error.error.message;
  }



}
