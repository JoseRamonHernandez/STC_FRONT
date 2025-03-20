import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() switchToRegister = new EventEmitter<void>();

  ngOnInit(): void {
  }

  n_empleado: string = '';
  pass:       string = '';

  user_n = this.n_empleado;

  private apiurl = 'http://localhost:9000';

  constructor(private http: HttpClient, private router: Router, private sharedDataService: SharedDataService) {}

  onLogin() {

    
    const user = {
      n_empleado: this.n_empleado,
      pass: this.pass
    };


    this.http.get(`${this.apiurl}/api/user/${this.n_empleado}`).subscribe({
      next: (response: any) => {

        if(response && response.length > 0){
          const userData = response[0];

          if(userData.password == this.pass && userData.status == 'approved')
          {
            this.alertaSuccess(userData.type_user, userData.n_empleado);
          }else if(userData.password == this.pass && userData.status == 'pending'){
            this.alertaInfo();
          }else{
            this.alertaError();
          }
                  
        } else{
          this.alertaError();
        }
      },
      error: (error) => {
       // console.log('Usuario no encontrado: ', error);
        alert('Error al intentar validar el número de empleado');
      }
    }); 
  }



  alertaSuccess(typeUser: string, n_empleado: string) {
    let timerInterval = 0;
    Swal.fire({
      icon: 'success',
      title: 'Acceso Correcto!',
      text: 'Bienvenid@ 👍',
      timer: 2500,
      timerProgressBar: true,
      showCloseButton: false,
      showConfirmButton: false,

      willClose: () =>{
        clearInterval(timerInterval)
      }
    }).then((result) => {
        if(result.dismiss === Swal.DismissReason.timer)
        {
          const navigationExtras = {
            state: { n_empleado } 
          };

          this.sharedDataService.setNEmpleado(n_empleado);

          if(typeUser == 'collaborator')
          {
            this.router.navigate(['/home']);
          }else if(typeUser == 'tech')
          {
            this.router.navigate(['/home-tech']);
          }else if(typeUser == 'direct')
          {
            this.router.navigate(['/home-direct']);
          }
          
        }
    })
  }

  alertaError(){
    Swal.fire({
      title: "Acceso Denegado",
      icon: "error"
    });
  }


  alertaInfo(){
    Swal.fire({
      title: "Tu usuario aun no ha sido aprovado, contacta a soporte.",
      icon: "info"
    });
  }


}


