import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo = new Todo('');
  @ViewChild('inputFisico') txtInputFisico: ElementRef;

  chkCompletado = new FormControl();
  txtInput = new FormControl();
  editando = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkCompletado.valueChanges.subscribe(() => {
      this.store.dispatch(actions.toggle({id: this.todo.id}));
    });
  }

  editar(): void {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 10);
  }

  terminarEdicion(): void {
    this.editando = false;
    if(this.txtInput.valid && this.txtInput.value !== this.todo.texto) {
      this.store.dispatch(actions.editar({id: this.todo.id, texto: this.txtInput.value}));
    }
  }

  borrar(): void {
    this.store.dispatch(actions.borrar({id: this.todo.id}));
  }
}
