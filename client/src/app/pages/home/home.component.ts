import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TabsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  searchTerm: string = '';
  searchResults: any[] = [];

  handleSearch() {
    // Aquí irá la lógica para hacer fetch a los resultados
    console.log('Buscando:', this.searchTerm);
    // Simulación de resultados:
    this.searchResults = [
      {
        title: 'Video de prueba 1',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID1/mqdefault.jpg',
      },
      {
        title: 'Video de prueba 2',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID2/mqdefault.jpg',
      },
      {
        title: 'Video de prueba 3',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID3/mqdefault.jpg',
      },
      {
        title: 'Video de prueba 4',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID4/mqdefault.jpg',
      },
      {
        title: 'Video de prueba 5 jashdjas asjdhasf jashdas ',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID5/mqdefault.jpg',
      },
      {
        title: 'Video de prueba 6',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID6/mqdefault.jpg',
      },
      {
        title: 'Video de prueba 7',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID7/mqdefault.jpg',
      },
    ];
  }
}
