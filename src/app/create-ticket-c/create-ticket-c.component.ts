import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-ticket-c',
  templateUrl: './create-ticket-c.component.html',
  styleUrls: ['./create-ticket-c.component.css']
})
export class CreateTicketCComponent implements OnInit {

  n_empleado: string | null = null;

  private apiurl = 'http://localhost:9000';

  constructor(private router: Router, private route: ActivatedRoute, private sharedDataService: SharedDataService, private http: HttpClient) { }

  ngOnInit(): void {
    console.log("Create_ticket_ROUTER");
    this.n_empleado = this.sharedDataService.getNEmpleado();
    console.log('Empleado:', this.n_empleado); 

    //Obtener el ultimo ticket creado para extraer el indice para el nuevo
    this.http.get(`${this.apiurl}/api/ticket/last`).subscribe({
      next: (response: any) => {

        if(response){
          const ticketData = response;
          console.log("Encuentra el último ticket registrado");
          console.log(ticketData);
          if(ticketData.ticket)
          {
            this.ticket_id = ticketData.ticket;
          console.log('ticket_id: ' + this.ticket_id);
          const numeroTicket = this.ticket_id.split('STC-')[1];
          console.log('numeroTicket: ' + numeroTicket);
          this.numeroIncrementado = (parseInt(numeroTicket, 10) + 1).toString();
          console.log('Numero_Incrementado: ' +this.numeroIncrementado );
          //Concatenar indice para el valor TICKET
          this.nuevoTicket = 'STC-' + this.numeroIncrementado.padStart(5, '0'); // 'STC-0000(+1)'
          }else{
            this.nuevoTicket = 'STC-00001';
          }
          }else{
            this.nuevoTicket = 'STC-00001';
          }
          console.log(this.nuevoTicket);
        }
      });

      console.log('Nuevo_Ticket: ' + this.nuevoTicket);
  }

  resumen:  String = '';
  desc:     String  = '';
  area:     String  = '';

  contador: number = 0;

  ticket_id:  String = '';
  numeroIncrementado: String = '';
  nuevoTicket: string = '';

  crearT(){

    if(!this.n_empleado){
      this.loginError();
    }else{

      //Peticion POST para crear Ticket
        const ticket = {
          ticket: this.nuevoTicket,
          resumen: this.resumen,
          description: this.desc,
          area: this.area,
          user: this.n_empleado,
          status: 'pendiente',
          closed: 'no',
          comentario: '',
          date_application: '----/--/--'
        };

        this.http.post(`${this.apiurl}/api/ticketCreate`, ticket).subscribe({
          next: (response: any) => {
            //this.userCreateSuccess();
            console.log('Registro Exitoso: ', response);
            this.succesTicket();
          },
          error: (error: any) => {
           // this.userCreateError();
            //console.error('Error al crear usuario: ', error);
            alert('Error, verificar datos');
          }
        });
        console.log(ticket);
      }
    
  }

  loginError(){
    Swal.fire({
      icon: "error",
      title: "Acceso Denegado",
      text: 'Ocurrio un error',
      showCancelButton: false,
      showDenyButton: false,
      showConfirmButton: true,
      confirmButtonText: 'ACEPTAR'
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/']);
      }
    })
  }

  succesTicket(){
    Swal.fire({
      icon: 'success',
      title: 'Ticket Creado Exitosamente',
      showCancelButton: false,
      showDenyButton: false,
      showConfirmButton: true,
      confirmButtonText: 'ACEPTAR'
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/home'])
      }
    })
  }

}
