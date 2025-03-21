import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HomeTechComponent } from './home-tech/home-tech.component';
import { HomeDirectComponent } from './home-direct/home-direct.component';
import { RegisterComponent } from './register/register.component';
import { CreateTicketCComponent } from './create-ticket-c/create-ticket-c.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { ReplyTicketComponent } from './reply-ticket/reply-ticket.component';
import { ShowTicketsComponent } from './show-tickets/show-tickets.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { ReplyUserComponent } from './reply-user/reply-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  // Ruta por defecto que llevará a Login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent }, // Ruta de colaborador
  { path: 'create_ticket', component: CreateTicketCComponent }, // Ruta de colaborador
  { path: 'edit_ticket/:ticket_id', component: EditTicketComponent}, // Ruta de colaborador
  { path: 'home-tech', component: HomeTechComponent },
  { path: 'user_reg', component: UserRegComponent }, 
  { path: 'reply_user/:user_id', component: ReplyUserComponent },
  { path: 'reply_ticket/:ticket_id', component: ReplyTicketComponent},
  { path: 'home-direct', component: HomeDirectComponent },
  { path: 'show_tickets', component: ShowTicketsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
