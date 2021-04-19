import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  combineLatest,
  ReplaySubject,
  BehaviorSubject,
  throwError,
} from 'rxjs';
import { take, catchError, shareReplay, pluck, tap, map } from 'rxjs/operators';
import { Episodes, ResultsEntity } from './episodes.entity';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private episodesUrl = '/api/episode';

  episodes$ = this.http
    .get<Episodes>(this.episodesUrl)
    .pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
      catchError(this.handleError)
    );

  private episodesFavoriteSubject = new BehaviorSubject<number[]>([]);
  episodesFavoriteAction$ = this.episodesFavoriteSubject.asObservable();

  favorites$ = combineLatest(
    this.episodes$.pipe(pluck('results')),
    this.episodesFavoriteAction$
  ).pipe(
    map(
      ([results, favorites]: [ResultsEntity[] | null | undefined, number[]]) =>
        results?.filter((result) => favorites.includes(result.id))
    ),
    catchError(this.handleError)
  );

  constructor(private http: HttpClient) {}

  addFavorite(episodeId: number): void {
    const favs = this.episodesFavoriteSubject.value;
    const prevFavs = new Set(favs);
    prevFavs.add(episodeId);
    const newFavs = Array.from(prevFavs);
    if (newFavs.length !== favs.length) {
      this.episodesFavoriteSubject.next(newFavs);
    }
  }

  deleteFavorite(episodeId: number): void {
    const deleted = this.episodesFavoriteSubject.value.filter(
      (fav) => fav !== episodeId
    );
    this.episodesFavoriteSubject.next(deleted);
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (typeof err === 'string') {
      errorMessage = err;
    } else {
      errorMessage = `Backend returned error code ${err.status}: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
