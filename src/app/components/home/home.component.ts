import {Component, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {TodoService} from '../../services/todo.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos: Todo[] = [];
  todoForm: FormGroup;

  constructor(public todoService: TodoService, public builder: FormBuilder) {
  }

  ngOnInit() {
    this.todoForm = this.builder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
    });
    this.fetchAll();
  }

  fetchAll() {
    this.todoService.findAll().subscribe(perf => {
      this.todos = perf;
    }, err => {
      window.alert('Error!');
    });
  }

  saveTodo() {
    const todo: Todo = this.todoForm.getRawValue();
    this.todoService.save(todo).subscribe(perf => {
      this.todos.push(perf);
      this.todoForm.reset();
    }, err => {
      alert('Error');
      console.log(err);
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteById(todo.id).subscribe(perf => {
      this.todos = this.todos.filter(e => e.id !== todo.id);
    }, err => {
      alert('Error');
    });
  }

  updateDone(todo: Todo) {
    todo.isDone = true;
    this.todoService.update(todo.id, todo).subscribe(perf => {
      todo = perf;
    });
  }
}
