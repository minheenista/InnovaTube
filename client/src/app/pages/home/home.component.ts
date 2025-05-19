import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { YouTubeService } from '../../services/youtube.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TabsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  searchTerm: string = '';
  searchResults: any[] = [];
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  searchQuery: string = '';
  results: any[] = [];

  user: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private youtubeService: YouTubeService
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  /* handleSearch() {
    console.log('Buscando:', this.searchTerm);
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
  } */

  search() {
    const query = this.searchForm.value.search;
    console.log('Buscando:', query);

    this.youtubeService.searchVideos(this.searchQuery).subscribe((res) => {
      this.searchResults = res.items.map((item: any) => ({
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        videoId: item.id.videoId,
      }));
    });
    console.log('Resultados:', this.searchResults);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
