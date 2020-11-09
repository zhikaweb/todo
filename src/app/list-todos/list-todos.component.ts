import { Component, OnInit } from '@angular/core';
import {TodoDataService} from "../service/data/todo-data.service";
import {Router} from "@angular/router";

export class Todo {
  constructor(public id: number,
              public description: string,
              public done: boolean,
              public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  messageSuccessDelete:string;

  //массив тудушек
  todos:Todo[];
    // = [
  //:   {id: 1, description: 'Feed Rabbits'},
  //   {id: 2, description: 'Learn Angular'},
  //   {id: 3, description: 'See Zhika'}
  // ];

  //вместо этой фигни делаем нормальные объекты с параметрами
  // todos = [
  //   new Todo(1, 'Feed Rabbits', false, new Date()),
  //   new Todo(2, 'Learn Angular', false, new Date()),
  //   new Todo(3 , 'See Zhika', false, new Date())
  //   ];

  //создаем объект тодо с параметрами (его будем потом тащить из бд)
  //и скормим его html
  // todo =  {
  //   id : 1,
  //   description: 'Feed Rabbits'
  // };

  constructor(
    private todoDataService:TodoDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshTodos();
  };

  refreshTodos() {
    this.todoDataService.retrieveAllTodos("svetoolya").subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id) {
    console.log(`delete todo ${id}`);
    this.todoDataService.deleteTodo('svetoolya', id).subscribe(
      response => {
        console.log(response);
        this.messageSuccessDelete = `Delete of Todo ${id} successful!`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id: number) {
    console.log(`update ${id}`);
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }
}
