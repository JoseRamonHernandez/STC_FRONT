import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, LinearScale, BarElement, Title, Tooltip, Legend, BarController, CategoryScale } from 'chart.js';  // Importar los necesarios

@Component({
  selector: 'app-home-direct',
  templateUrl: './home-direct.component.html',
  styleUrls: ['./home-direct.component.css']
})
export class HomeDirectComponent implements OnInit {

  tickets: any[] = [];
  chart: any;
  private apiurl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(`${this.apiurl}/api/tickets`).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response);  // Muestra la respuesta en la consola
          this.tickets = response;  // Guarda los datos en la variable tickets
          this.createChart();  // Llama a la función para crear la gráfica
        }
      }
    });
  }

  createChart(): void {
    // Registrar las escalas, controladores, elementos y otros componentes necesarios de Chart.js
    Chart.register(LinearScale, BarElement, Title, Tooltip, Legend, BarController, CategoryScale);

    // Contamos los tickets por estado
    const statuses = {
      pendiente: 0,
      aprobado: 0,
      rechazado: 0,
      cerrado: 0
    };

    // Clasificamos los tickets según su estado
    this.tickets.forEach(ticket => {
      switch (ticket.status) {
        case 'pendiente':
          statuses.pendiente++;
          break;
        case 'aprobado':
          statuses.aprobado++;
          break;
        case 'rechazado':
          statuses.rechazado++;
          break;
        case 'cerrado':
          statuses.cerrado++;
          break;
      }
    });

    // Total de tickets
    const totalTickets = statuses.pendiente + statuses.aprobado + statuses.rechazado + statuses.cerrado;

    // Creamos la gráfica
    this.chart = new Chart('canvas', {
      type: 'bar',  // Tipo de gráfica (barra)
      data: {
        labels: ['Pendientes', 'Aprobados', 'Rechazados', 'Cerrados'], // Etiquetas del eje X
        datasets: [
          {
            label: 'Tickets por estado', // Etiqueta de la gráfica
            data: [statuses.pendiente, statuses.aprobado, statuses.rechazado, statuses.cerrado], // Los datos de la gráfica
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // Color de fondo de las barras
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // Color del borde de las barras
              'rgba(54, 162, 235, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1 // Grosor del borde de las barras
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true,  // Habilita las tooltips en el gráfico
          }
        },
        scales: {
          x: {
            type: 'category' // Usamos la escala de categoría para el eje X
          },
          y: {
            beginAtZero: true  // El eje Y comenzará desde 0
          }
        }
      },
      // Registra el plugin personalizado
      plugins: [
        {
          id: 'customTextPlugin',
          beforeDraw: (chart) => {
            const ctx = chart.ctx;

            // Texto que queremos mostrar
            const totalText = `Total de Tickets: ${totalTickets}`;
            const pendienteText = `Pendientes: ${statuses.pendiente}`;
            const aprobadoText = `Aprobados: ${statuses.aprobado}`;
            const rechazadoText = `Rechazados: ${statuses.rechazado}`;
            const cerradoText = `Cerrados: ${statuses.cerrado}`;

            // Calculamos las posiciones para centrar el texto
            const xPos = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
            const yPos = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 6;

            // Guardamos el contexto y dibujamos los textos sobre el gráfico
            ctx.save();
            ctx.font = '16px Arial';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Escribimos el total y las cifras de cada estado
            ctx.fillText(totalText, xPos, yPos);
            ctx.fillText(pendienteText, xPos, yPos + 20);
            ctx.fillText(aprobadoText, xPos, yPos + 40);
            ctx.fillText(rechazadoText, xPos, yPos + 60);
            ctx.fillText(cerradoText, xPos, yPos + 80);

            ctx.restore();
          }
        }
      ]
    });
  }
}
