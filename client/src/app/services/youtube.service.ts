import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class YouTubeService {
  private apiKey = 'AIzaSyBFb0HfcPLrC04zQaREkdP-8724h2Q7eH0';
  private apiUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBFb0HfcPLrC04zQaREkdP-8724h2Q7eH0`;

  constructor(private http: HttpClient) {}

  searchVideos(params: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}&part=snippet&q=${params}&type=video&maxResults=30&order=relevance`
    );
  }
}
