import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {

  ticketId: string = '';
  ticket: any = {};

  constructor( private route: ActivatedRoute,
    private http: HttpClient,
  private router: Router) { }

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('ticket_id') || '';
    if(this.ticketId){
      console.log(this.ticketId);
      this.http.get(`http://localhost:9000/api/ticket/${this.ticketId}`).subscribe({
        next: (response: any) => {
          this.ticket = response[0];
          console.log(this.ticket);
        },
        error: (err) => {
          console.error('Error al obtener el ticket', err);
        }
      });
    }
    }

    resumen: String = '';
    description: String = '';
    area: String = '';

    updateTicket(): void {

      this.ticket.status = 'pendiente';

      this.http.put(`http://localhost:9000/api/ticket/${this.ticketId}`, this.ticket).subscribe({
        next: (response) => {
          console.log('Ticket actualizado correctamente', response);
          // Puedes redirigir a otra página después de la actualización
          this.updateSuccess();
        },
        error: (err) => {
          console.error('Error al actualizar el ticket', err);
        }
      });

    }


    updateSuccess(){
      Swal.fire({
        icon: 'success',
        title: 'Ticket Actualizado con exito',
        showCancelButton: false,
        showCloseButton: false,
        showConfirmButton: true
      }).then((resquest) => {
        if(resquest.isConfirmed)
        {
          this.router.navigate(['/home']);
        }
      })
    }

  }


