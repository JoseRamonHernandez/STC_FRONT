import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'STC';

  showLoginForm: boolean = true;

  // Método para cambiar entre Login y Registro
  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }
}
