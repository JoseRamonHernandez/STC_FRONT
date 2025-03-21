import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements OnInit {

  n_empleado: string | null = null;
  private apiurl = 'http://localhost:9000';
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,  private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.n_empleado = this.sharedDataService.getNEmpleado();

    console.log('Empleado:', this.n_empleado); 

    if(this.n_empleado === null)
    {
      this.router.navigate(['/login'])
    }

    this.http.get(`${this.apiurl}/api/users`).subscribe({
      next: (response: any) => {

        if(response){
          console.log(response);
          this.users = response;
        }
      }
    });
  }

}
