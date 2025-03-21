import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HomeTechComponent } from './home-tech/home-tech.component';
import { HomeDirectComponent } from './home-direct/home-direct.component';
import { CreateTicketCComponent } from './create-ticket-c/create-ticket-c.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { ReplyTicketComponent } from './reply-ticket/reply-ticket.component';
import { ShowTicketsComponent } from './show-tickets/show-tickets.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { ReplyUserComponent } from './reply-user/reply-user.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomeTechComponent,
    HomeDirectComponent,
    CreateTicketCComponent,
    EditTicketComponent,
    ReplyTicketComponent,
    ShowTicketsComponent,
    UserRegComponent,
    ReplyUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  showLoginForm: boolean = true;

  // Método para cambiar entre Login y Registro
  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }
 }
