import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Episodes } from './episodes.entity';

import { combineLatest, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private episodesUrl = 'https://rickandmortyapi.com/api/episode';

  episodes$ = this.http.get<Episodes>(this.episodesUrl);
  // .pipe(tap(console.table));

  constructor(private http: HttpClient) {}
}
