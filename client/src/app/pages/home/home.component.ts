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
import { Video } from '../../models/video.model';
import { FavoritesService } from '../../services/favorites.service';
import { Favorite } from '../../models/favorite.model';

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
  videos: Video[] = [];
  favorites: Favorite[] = [];

  user: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private youtubeService: YouTubeService,
    private favoritesService: FavoritesService
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.loadFavorites(this.user.id);
  }

  search() {
    const query = this.searchForm.value.search;
    console.log('Buscando:', query);

    this.youtubeService.searchVideos(this.searchQuery).subscribe((res) => {
      this.searchResults = res.items.map((item: any) => ({
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        videoId: item.id.videoId,
        isFavorite: this.isFavorite(item.id.videoId),
      }));
    });
    console.log('Resultados:', this.searchResults);
  }

  loadFavorites(userId: string) {
    console.log('Cargando favoritos para el usuario:', userId);
    this.favoritesService.getFavorites(userId).subscribe((favs) => {
      this.favorites = favs.map((fav: any) => ({
        userId: fav.userId,
        videoId: fav.videoId,
        title: fav.title,
        thumbnail: fav.thumbnail,
      }));
      console.log('Favoritos cargados:', this.favorites);
    });
  }

  isFavorite(videoId: string): boolean {
    return this.favorites.some((fav) => fav.videoId === videoId);
  }

  toggleFavorite(video: any) {
    if (this.isFavorite(video.videoId)) {
      this.favoritesService
        .removeFavorite(this.user.id, video.videoId)

        .subscribe(() => {
          this.loadFavorites(this.user.id);
        });
      video.isFavorite = false;
    } else {
      const fav: Favorite = {
        userId: this.user.id,
        videoId: video.videoId,
        title: video.title,
        thumbnail: video.thumbnail,
      };
      this.favoritesService
        .addToFavorites(
          this.user.id,
          video.videoId,
          video.title,
          video.thumbnail
        )
        .subscribe(() => {
          this.loadFavorites(this.user.id);
          video.isFavorite = true;
        });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
