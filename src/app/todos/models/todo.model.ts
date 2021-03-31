
export class Todo {
  public id: number;
  texto: string;
  completado: boolean;

  constructor (texto: string) {
    this.texto = texto;
    this.id = Math.random();
    this.completado = false;
  }
}
