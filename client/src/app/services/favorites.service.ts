import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from './../models/video.model';
import { Favorite } from '../models/favorite.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private api = 'http://localhost:4000/favorites/';

  constructor(private http: HttpClient) {}

  addToFavorites(
    userId: string,
    videoId: string,
    title: string,
    thumbnail: string
  ) {
    return this.http.post(this.api, { userId, videoId, title, thumbnail });
  }

  getFavorites(userId: string) {
    return this.http.get<Favorite[]>(`${this.api}${userId}`);
  }

  removeFavorite(userId: string, videoId: string) {
    return this.http.delete(`${this.api}${userId}/${videoId}`);
  }
}
