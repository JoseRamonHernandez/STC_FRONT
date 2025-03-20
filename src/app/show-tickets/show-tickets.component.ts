import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-tickets',
  templateUrl: './show-tickets.component.html',
  styleUrls: ['./show-tickets.component.css']
})
export class ShowTicketsComponent implements OnInit {

  notificationCount: number = 3;
  n_empleado: string | null = null;
  private apiurl = 'http://localhost:9000';
  tickets: any[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.http.get(`${this.apiurl}/api/tickets`).subscribe({
      next: (response: any) => {

        if(response){
          console.log(response);
          this.tickets = response;
        }
      }
    });
  }

  show(ticket_id: String,
    resumen: string,
    description: string,
    user: String,
    status: string,
    area: string,
    date_applicate: String): void{

      let text_concatenate: string;
                  text_concatenate = 'RESUMEN: ' + resumen + 
                  ' - DESCRIPCION: ' + description + 
                  ' - USUARIO: ' + user +
                  ' - STATUS: ' + status +
                  ' - AREA: ' + area +
                  ' - FECHA DE APLICACION: ' + date_applicate;
                  Swal.fire({
                    icon: 'info',
                    title: ticket_id,
                    text: text_concatenate,
                    showCancelButton: false,
                    showConfirmButton: false,
                    showCloseButton: true
                  })

  }


}
