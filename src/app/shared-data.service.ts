import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private nEmpleado: string | null = null;

  constructor() { }

   setNEmpleado(n_empleado: string): void {
    this.nEmpleado = n_empleado;
  }

  getNEmpleado(): string | null {
    return this.nEmpleado;
  }

}
