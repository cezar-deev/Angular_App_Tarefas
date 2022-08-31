import { Todo } from './../models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public form: FormGroup;
  public mode: String = 'list';

  constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        title: ['',Validators.compose([
            Validators.minLength(3), // min 3 caracteres
            Validators.maxLength(60), // Max 60 caracteres
            Validators.required, // é obrigatorio, é requerido
        ])]
      });

      this.load();  
  }

  changeMode(mode:string) {
    this.mode = mode;
  }

  add() {
    const title = this.form.controls['title'].value; // recebe um valor do title
    const id = this.todos.length + 1; // pegando o id pela quantidade do todos
    this.todos.push(new Todo(id, title, false)) // adicionando o item
    this.save(); // Executar o metodo save()criado lá em baixo
    this.clear(); // chamei o metodo clear , para branquaer o campo ao adicionar
    this.changeMode('list');
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo); //capturei o indice do todo recebido.
    if(index !== -1) { // Se index for diferente de -1, removo ele da lista.
      this.todos.splice(index, 1); // Aqui removo 1 registro da lista.
      this.save();
    }
  }

  markAsDone(todo: Todo) {
      todo.done = true; // done é uma variavel bolleana,do todo.model.
      // Aqui o todo foi passado como referencia,nao precisou do this.
      this.save();

  }

  markAsUndone(todo: Todo) {
    todo.done = false;  // done é uma variavel bolleana,do todo.model.
    // Aqui o todo foi passado como referencia,nao precisou do this.
    this.save();
  }

  save() // Metodo para salvar no localStotage
  {
    const data = JSON.stringify(this.todos); // recebe na var data String/Json
    localStorage.setItem('todos', data); // Setar ou inserir no localstorage como chave e valor
    this.mode = 'list'
  }

  load () {
    const data = localStorage.getItem('todos'); // lendo do localstorage e guardando na var data
    if (data) {
      this.todos = JSON.parse(data)
    } else {
      this.todos =[]
     } 
  }

}




// TIPOS DE Binding ( ligações da tela com o typeScript)

// () = HTML > TS ( html p/ o TypeScrip )
// [] = TS > HTML ( TypeScrip p/ o html)
// [()] = TS <> HTML ( vice e versa )