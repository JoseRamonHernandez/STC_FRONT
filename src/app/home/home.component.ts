import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notificationCount: number = 3;  // Aquí se puede actualizar el valor
  n_empleado: string | null = null;
  private apiurl = 'http://localhost:9000';
  tickets: any[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.n_empleado = this.sharedDataService.getNEmpleado();
    console.log('Empleado:', this.n_empleado); 

    if(this.n_empleado === null)
    {
      this.router.navigate(['/login'])
    }

    // Peticion para obtener todos los tickets del usuario logeado
    this.http.get(`${this.apiurl}/api/ticket/user/${this.n_empleado}`).subscribe({
      next: (response: any) => {

        if(response){
          console.log(response);
          this.tickets = response;
        }
      }
      })
  }
  

    // Si el contador cambia dinámicamente, por ejemplo:
    incrementCount() {
      this.notificationCount += 1;
    }
  
    decrementCount() {
      this.notificationCount -= 1;
    }
    

    showTicket(ticket_id: string): void {
      this.http.get(`${this.apiurl}/api/ticket/${ticket_id}`).subscribe({
        next: (response: any) => {
          if(response){
            const ticket_data = response[0];
            console.log(ticket_data);
            this.show(ticket_data.ticket, 
                      ticket_data.resumen, 
                      ticket_data.description,
                      ticket_data.status,
                      ticket_data.area,
                      ticket_data.closed)
          }
        }
      })
    }

    show( ticket: string,
          resumen: string,
          description: string,
          status: string,
          area: string,
          closed: string){
            let text_concatenate: string;
            text_concatenate = 'RESUMEN: ' + resumen + ' - DESCRIPCION: ' + description + ' - STATUS: ' + status;
            Swal.fire({
              icon: 'info',
              title: ticket,
              text: text_concatenate,
              showCancelButton: false,
              showConfirmButton: false,
              showCloseButton: true
            })
          }



    deleteTicket(ticketId: string): void {
      this.http.delete(`${this.apiurl}/api/ticket/${ticketId}`).subscribe({
        next: (response) => {
          if(response){
            console.log("Ticket Eliminado", response);
            this.tickets = this.tickets.filter(ticket => ticket.ticket !== ticketId);
            this.deleteSuccess();
          }
        },
        error: (err) => {
          console.log("Error al eliminar el ticket", err);
        }
      })
    }


    deleteSuccess(){
      Swal.fire({
        icon: 'success',
        title: "Se elimino correctamente el ticket",
        showCancelButton: false,
        showCloseButton: false,
        showConfirmButton: true,
        confirmButtonText: "Aceptar"
      })
    }

}
