import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reply-ticket',
  templateUrl: './reply-ticket.component.html',
  styleUrls: ['./reply-ticket.component.css']
})
export class ReplyTicketComponent implements OnInit {

  ticketId: string = '';
  ticket: any = {};

  constructor(private route: ActivatedRoute,
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
          if(this.ticket.status === 'pendiente')
          {
            this.aprobar(this.ticket.ticket);
          }else if(this.ticket.status === 'aprobado')
          {
            this.cerrar(this.ticket.ticket);
          }
        },
        error: (err) => {
          console.error('Error al obtener el ticket', err);
        }
      });
    }
  }

  aprobar(ticket_id: String): void{
    let text_concatenate: string;
    text_concatenate = 'RESUMEN: ' + this.ticket.resumen + ' - DESCRIPCION: ' + this.ticket.description + ' - AREA: ' + this.ticket.area;
    Swal.fire({
                            icon: 'info',
                            title: this.ticket.ticket,
                            text: text_concatenate,
                            showCancelButton: true,
                            showConfirmButton: true,
                            showCloseButton: true,
                            confirmButtonText: "APROBAR",
                            confirmButtonColor: "green",
                            cancelButtonText: "RECHAZAR",
                            cancelButtonColor: "red"
                          }).then((request) => {
                            if(request.isConfirmed)
                            {
                              this.update(this.ticket.ticket);
                            }else if(request.isDismissed)
                            {
                              this.decline(this.ticket.ticket);
                            }
                          });
  }


    update(ticket_id: string){
      Swal.fire({
        icon: 'question',
        title: 'Ingresa la fecha de aplicación',
        input: 'date',
        showCancelButton: false,
        showCloseButton: true,
        confirmButtonText: 'Actualizar',
        confirmButtonColor: 'blue',
        showLoaderOnConfirm: true, 
        preConfirm: async(date) => {
          if (!date) {
            Swal.showValidationMessage('Debes ingresar una fecha');
          }
          return date;
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const date_application = result.value;
    
          const ticket_put = {
            status: 'aprobado',
            date_application: date_application
          }
    
          this.http.put(`http://localhost:9000/api/ticket/put/${ticket_id}`, ticket_put).subscribe({
            next: (response) => {
              console.log('Ticket actualizado correctamente', response);
              // Redirigir o mostrar un mensaje de éxito
              Swal.fire({
                icon: 'success',
                title: 'Se actualizo correctamente el ticket',
                showCancelButton: false,
                showCloseButton: false,
                showConfirmButton: true,
                confirmButtonText: 'ACEPTAR'
              }).then((request) => {
                if(request.isConfirmed)
                {
                  this.router.navigate(['/home-tech']);
                }
              })
            },
            error: (err) => {
              console.error('Error al actualizar el ticket', err);
            }
          });
        } else {
          // Si el usuario cancela, puedes hacer algo si es necesario
          console.log('Actualización cancelada');
        }
      });
    }
  
    decline(ticket_id: string){
      Swal.fire({
        icon: 'error',
        title: 'Ingresa el motivo del rechazo',
        input: 'text',
        showCancelButton: false,
        showCloseButton: true,
        confirmButtonText: 'Actualizar',
        confirmButtonColor: 'blue',
        showLoaderOnConfirm: true, 
        preConfirm: async(date) => {
          if (!date) {
            Swal.showValidationMessage('Debes ingresar una justificación');
          }
          return date;
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const justificacion = result.value;
    
          const ticket_put = {
            status: 'rechazado',
            comentario: justificacion
          }
    
          this.http.put(`http://localhost:9000/api/ticket/put/decline/${ticket_id}`, ticket_put).subscribe({
            next: (response) => {
              console.log('Ticket actualizado correctamente', response);
              // Redirigir o mostrar un mensaje de éxito
              Swal.fire({
                icon: 'success',
                title: 'Se actualizo correctamente el ticket',
                showCancelButton: false,
                showCloseButton: false,
                showConfirmButton: true,
                confirmButtonText: 'ACEPTAR'
              }).then((request) => {
                if(request.isConfirmed)
                {
                  this.router.navigate(['/home-tech']);
                }
              })
            },
            error: (err) => {
              console.error('Error al actualizar el ticket', err);
            }
          });
        } else {
          // Si el usuario cancela, puedes hacer algo si es necesario
          console.log('Actualización cancelada');
        }
      });
    }
  


  cerrar(ticket_id: String): void{
    const ticket_put = {
          status: 'cerrado',
        }
    
        this.http.put(`http://localhost:9000/api/ticket/${ticket_id}`, ticket_put).subscribe({
          next: (response) => {
            console.log('Ticket cerrado correctamente', response);
            Swal.fire({
              icon: 'success',
              title: 'Se cerro correctamente el ticket',
              showCancelButton: false,
              showCloseButton: false,
              showConfirmButton: true,
              confirmButtonText: 'ACEPTAR'
            }).then((request) => {
              if(request.isConfirmed)
              {
                this.router.navigate(['/home-tech']);
              }
            })
          },
          error: (err) => {
            console.error('Error al actualizar el ticket', err);
          }
        });
  }
  

}
