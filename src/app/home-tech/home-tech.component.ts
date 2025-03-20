import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-tech',
  templateUrl: './home-tech.component.html',
  styleUrls: ['./home-tech.component.css']
})
export class HomeTechComponent implements OnInit {

  notificationCount: number = 3;
  n_empleado: string | null = null;
  private apiurl = 'http://localhost:9000';
  tickets: any[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.n_empleado = this.sharedDataService.getNEmpleado();

    console.log('Empleado:', this.n_empleado); 

    if(this.n_empleado === null)
    {
      this.router.navigate(['/login'])
    }

    this.http.get(`${this.apiurl}/api/tickets`).subscribe({
      next: (response: any) => {

        if(response){
          console.log(response);
          this.tickets = response;
        }
      }
    })
  }


  replyTicket(ticket_id: string): void {
    this.http.get(`${this.apiurl}/api/ticket/${ticket_id}`).subscribe({
      next: (response: any) =>{
        if(response){
          let ticket_data = response[0];

          let text_concatenate: string;
                      text_concatenate = 'RESUMEN: ' + ticket_data.resumen + ' - DESCRIPCION: ' + ticket_data.description + ' - AREA: ' + ticket_data.area;
                      Swal.fire({
                        icon: 'info',
                        title: ticket_data.ticket,
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
                          this.update(ticket_data.ticket);
                        }else if(request.isDismissed)
                        {
                          this.decline(ticket_data.ticket);
                        }
                      })
        }
      }
    })
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
                window.location.reload();
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
  
        this.http.put(`http://localhost:9000/api/ticket/${ticket_id}`, ticket_put).subscribe({
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

  closeTicket(ticket_id: string): void{
    const ticket_put = {
      status: 'cerrado',
    }

    this.http.put(`http://localhost:9000/api/ticket/${ticket_id}`, ticket_put).subscribe({
      next: (response) => {
        console.log('Ticket cerrado correctamente', response);
        // Redirigir o mostrar un mensaje de éxito
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
