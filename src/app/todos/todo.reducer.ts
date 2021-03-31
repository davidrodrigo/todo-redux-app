import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Array<Todo> = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar cosas'),
  new Todo('Robar cosas')
];

const _todoReducer = createReducer(
  initialState,
  on(actions.crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(actions.toggle, (state, { id }) => {
    return state.map(todo => {
      if (todo.id === id) {
      return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    });
  }),
  on(actions.editar, (state, { id, texto }) => {
    return state.map(todo => {
      if (todo.id === id) {
      return {
          ...todo,
          texto
        }
      } else {
        return todo;
      }
    });
  }),
  on(actions.borrar, (state, { id }) => state.filter(todo => todo.id !== id)),
  on(actions.limpiarTodos, (state) => state.filter(todo => !todo.completado)),
  on(actions.toggleAll, (state, { completado }) => state.map(todo => {
    return {
      ...todo,
      completado: completado
    }
  }))

);

export function todoReducer(state: any, action: Action) {
  return _todoReducer(state, action);
}
