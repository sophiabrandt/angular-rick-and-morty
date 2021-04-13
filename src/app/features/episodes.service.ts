import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Episodes } from './episodes.entity';


@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private episodesUrl = '/api/episode';

  episodes$ = this.http
    .get<Episodes>(this.episodesUrl)
    .pipe(tap(console.log), catchError(this.handleError));

  constructor(private http: HttpClient) {}

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
