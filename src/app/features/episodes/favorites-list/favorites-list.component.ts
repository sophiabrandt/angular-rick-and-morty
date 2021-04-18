import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EpisodesService } from '../../episodes.service';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  Observable,
  Subject,
} from 'rxjs';
import { filter, tap, catchError, map, pluck } from 'rxjs/operators';
import { Episodes, ResultsEntity } from '../../episodes.entity';

@Component({
  selector: 'rm-favorites-list',
  template: `
    <section class="pa2 pa4-ns">
      <article class="ba b--black-10 br2 bg-near-white pa4 mw6 center">
        <div>
          <h4 class="f5 fw4 black-60 dib v-mid mv0 mr3">Favorites</h4>
        </div>
        <ul class="list f6 pl0 mt3 mb0" *ngIf="favorites$ | async as favorites">
          <li class="pv2" *ngFor="let fav of favorites">
            <a href="#" class="link dark-green lh-title">
              <span class="fw7 underline-hover">{{ fav?.name }}</span>
            </a>
            <button
              (click)="onDelete(fav.id)"
              class="ml2 bn pointer"
              type="button"
            >
              &#10007;
            </button>
          </li>
        </ul>
      </article>
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListComponent {
  error$ = new Subject<string>();

  favorites$: Observable<
    ResultsEntity[] | undefined
  > = this.episodesService.favorites$.pipe(
    catchError((error) => {
      this.error$.next(error);
      return EMPTY;
    })
  );

  constructor(private episodesService: EpisodesService) {}

  onDelete(episodeId: number): void {
    this.episodesService.deleteFavorite(episodeId);
  }
}
