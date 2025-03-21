import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-reply-user',
  templateUrl: './reply-user.component.html',
  styleUrls: ['./reply-user.component.css']
})
export class ReplyUserComponent implements OnInit {

  userId: string = '';
  user: any = {};
  n_empleado: string | null = null;

  constructor(private route: ActivatedRoute,
        private http: HttpClient,
      private router: Router,
     private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.n_empleado = this.sharedDataService.getNEmpleado();

    console.log('Empleado:', this.n_empleado); 

    if(this.n_empleado === null)
    {
      this.router.navigate(['/login'])
    }

    this.userId = this.route.snapshot.paramMap.get('user_id') || '';
    if(this.userId){

      this.http.get(`http://localhost:9000/api/user/${this.userId}`).subscribe({
        next: (response: any) => {
          this.user = response[0];
          if(this.user.status === 'pending'){

            const user_put = {
              status: "approved"
            };

            Swal.fire({
              icon: "question",
              title: this.userId,
              text: 'Habilitar usuario',
              showCancelButton: true,
              showConfirmButton: true,
              showCloseButton: false
            }).then((response) => {
              if(response.isConfirmed){
                this.http.put(`http://localhost:9000/api/user/${this.userId}`, user_put).subscribe({
                  next: (response) => {
      
                    if(response){
                      Swal.fire({
                        icon: "success",
                        title: "El usuario se actualizó correctamente",
                        showCancelButton: false,
                        showCloseButton: false,
                        showConfirmButton: true
                      }).then((resq) => {
                        if(resq.isConfirmed){
                          this.router.navigate(['/user_reg']);
                        }
                      })
                    }
      
                  },error: (err) => {
                    console.error('Error al actualizar el usuario', err);
                  }
                });
              }else if(response.isDismissed){
                this.router.navigate(['/user_reg']);
              }
            });

          }else if(this.user.status === 'approved'){

            const user_put = {
              status: "pending"
            };

            Swal.fire({
              icon: "question",
              title: this.userId,
              text: 'Deshabilitar usuario',
              showCancelButton: true,
              showConfirmButton: true,
              showCloseButton: false
            }).then((response) => {
              if(response.isConfirmed){
                this.http.put(`http://localhost:9000/api/user/${this.userId}`, user_put).subscribe({
                  next: (response) => {
      
                    if(response){
                      Swal.fire({
                        icon: "success",
                        title: "El usuario se actualizó correctamente",
                        showCancelButton: false,
                        showCloseButton: false,
                        showConfirmButton: true
                      }).then((resq) => {
                        if(resq.isConfirmed){
                          this.router.navigate(['/user_reg']);
                        }
                      })
                    }
      
                  },error: (err) => {
                    console.error('Error al actualizar el usuario', err);
                  }
                });
              }else if(response.isDismissed){
                this.router.navigate(['/user_reg']);
              }
            });

          }

         }
      });

      

      
    }
  }

}
