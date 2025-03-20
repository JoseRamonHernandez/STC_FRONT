import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

name: string = '';
lastname: string = '';
n_empleado: string = '';
email: string = '';
password1: string = '';
password2: string = '';

private apiurl = 'http://localhost:9000';


constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  }


  onRegister()
  {
    if(this.password1 == this.password2)
    {

      this.http.get(`${this.apiurl}/api/user/${this.n_empleado}`).subscribe({
        next: (response: any) => {
  
          if(response && response.length > 0){
            const userData = response[0];
              this.alertUserExits();
            }else{
              const user = {
                      name: this.name,
                      lastname: this.lastname,
                      n_empleado: this.n_empleado,
                      email: this.email,
                      password: this.password1,
                      type_user: 'collaborator',
                      status: 'pending'
                    };

                    this.http.post(`${this.apiurl}/api/userCreate`, user).subscribe({
                      next: (response: any) => {
                        this.userCreateSuccess();
                        //console.log('Registro Exitoso: ', response);
                        this.createEmail();
                      },
                      error: (error: any) => {
                        this.userCreateError();
                        //console.error('Error al crear usuario: ', error);
                        alert('Error al crear cuenta, verificar datos');
                      }
                    });
            }
            }
          });

    }else{
      this.alertError();
    }

  }

   alertError(){
      Swal.fire({
        title: "Error",
        text: 'Las contraseñas no coinciden, favor de validar.',
        icon: "error"
      });
    }

    alertUserExits(){
      Swal.fire({
        icon: 'info',
        title: 'Esta cuenta ya existe!',
        showCancelButton: false,
        showDenyButton: false,
        showCloseButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Iniciar Sesión',
        confirmButtonColor: 'green'
      }).then((result) => {
        if(result.isConfirmed)
        {
          this.router.navigate(['/login'])
        }
      });
    }

    userCreateSuccess(){
      Swal.fire({
        icon: 'success',
        title: 'El usuario se ha creado correctamente.',
        text: 'Espera la aprobación para poder inicar sesión, contacta a soporte!',
        showCancelButton: false,
        showDenyButton: false,
        showCloseButton: false,
        showConfirmButton: true,
        confirmButtonText: 'OK!',
      }).then((results) => {
        if(results.isConfirmed){
          this.router.navigate(['/login'])
        }
      });
    }
    
    userCreateError(){
      Swal.fire({
        icon: 'error',
        title: 'Error al crear usuario!',
        text: 'Intentelo nuevamente...',
        showCancelButton: false,
        showDenyButton: false,
        showCloseButton: false,
        showConfirmButton: true,
        confirmButtonText: 'OK!',
      }).then((results) => {
        if(results.isConfirmed){
          window.location.reload();
        }
      });
    }

    createEmail(){

      let text_concatenate = this.name + ' ' + this.lastname + ' ' + 'con el número de empleado: ' + ' ' + this.n_empleado + ' ' + 'ha creado un usuario para este sistema, accede al apartado "USUARIOS" para responder a su solicitud.';

      const email = {
        title: 'Usuario nuevo',
        text:  text_concatenate,
        empleado_orig: this.n_empleado,
        empleado_dest: '00002',
      };

      this.http.post(`${this.apiurl}/api/emailCreate`, email).subscribe({
        next: (response: any) => {
          console.log('Registro Exitoso: ', response);
        },
        error: (error: any) => {
          console.log('Error', error);
        }
      });

    }

}
