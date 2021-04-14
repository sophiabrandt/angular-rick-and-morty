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
    .pipe(catchError(this.handleError));

  private episodesFavoriteSubject = new BehaviorSubject<Number[]>([]);
  episodesFavoriteAction$ = this.episodesFavoriteSubject.asObservable();

  favorites$ = combineLatest(
    this.episodes$.pipe(
      pluck('results'),
      tap((x) => console.log('results', x))
    ),
    this.episodesFavoriteAction$.pipe(
      tap((x) => console.log('favoriteAction', x))
    )
  ).pipe(
    map(
      ([results, favorites]: [
        ResultsEntity[] | null | undefined,
        Number[]
      ]) => {
        // console.log({results})
        // console.log({favorites})
        return results?.filter((result) => favorites.includes(result.id));
      }
    ),
    shareReplay({refCount: true, bufferSize: 1}),
    catchError(this.handleError)
  );

  constructor(private http: HttpClient) {}

  favoriteEpisode(episodeId: number): void {
    console.log('favoriteEpisode method in service triggered');
    this.episodesFavoriteSubject.pipe(take(1)).subscribe((favs) => {
      const favsSet = new Set(favs);
      favsSet.add(episodeId);
      // TODO: next method triggers every time, even if favs are "identical"
      // to previous iteration
      this.episodesFavoriteSubject.next(Array.from(favsSet));
    });
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
