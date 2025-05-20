export interface Favorite {
  _id?: string;
  userId: string;
  videoId: string;
  title: string;
  thumbnail: string;
  isFavorite?: boolean;
  createdAt?: string;
}
