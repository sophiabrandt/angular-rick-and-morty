import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  Observable,
  Subject,
} from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';
import { Episodes, ResultsEntity } from '../../episodes.entity';
import { EpisodesService } from '../../episodes.service';

interface EpisodeSearch {
  name: string;
}

@Component({
  selector: 'rm-episode-list',
  template: `
    <div>
      <form [formGroup]="searchForm" (ngSubmit)="onSubmit(searchForm.value)">
        <div class="mv3">
          <label class="fw7 f6" for="episode-search">Episode Search</label>
          <input
            type="text"
            class="db w-100 pa2 mt2 br2 b--black-20 ba f6"
            id="episode-search"
            placeholder="Search for an episode"
            formControlName="name"
          />
        </div>
        <button
          type="submit"
          class="pointer br2 ba b--black-20 bg-white pa2 ml1 mv1 bg-animate hover-bg-light-gray f6"
        >
          Submit
        </button>
      </form>
      <div
        *ngIf="error$ | async as error"
        class="flex items-center justify-center pa4 bg-light-red navy mt4"
      >
        <svg
          class="w1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <path
            d="M120 144V96a8 8 0 0116 0v48a8 8 0 01-16 0zm116.768 67.981a23.754 23.754 0 01-20.791 12.011H40.023a24 24 0 01-20.771-36.022l87.977-151.993a24 24 0 0141.543 0l87.976 151.992a23.754 23.754 0 01.02 24.012zM222.9 195.984L134.924 43.992a8 8 0 00-13.848 0L33.1 195.984a8 8 0 006.923 12.008h175.954a8 8 0 006.923-12.008zM128 168a12 12 0 1012 12 12.013 12.013 0 00-12-12z"
          />
        </svg>
        <span class="lh-title ml3">{{ error }}</span>
      </div>

      <section class="flex flex-wrap" *ngIf="vm$ | async as vm">
        <div
          class="br2 ba dark-gray b--black-10 mv4 w-25-l mw5 mr4"
          *ngFor="let result of vm"
        >
          <article class="fl w-100 pa2 flex flex-column justify-between h-100">
            <img
              src="https://avatars.dicebear.com/api/bottts/{{
                result.episode
              }}.svg"
              class="db w-100 br2 br--top"
              alt="{{ result.name }}"
            />
            <div class="pa2 ph3-ns pb3-ns">
              <div class="dt w-100 mt1">
                <div class="dtc">
                  <h3 class="f5 f4-ns mv0">{{ result.name }}</h3>
                </div>
                <div class="dtc tr">
                  <p class="f5 mv0">Ep. {{ result.id }}</p>
                </div>
              </div>
              <hr class="mw3 bb bw1 b--black-10" />
              <p class="f6 lh-copy measure mt2 mid-gray">
                Air Date: {{ result.air_date }}
              </p>
              <p class="f6 lh-copy measure mt2 mid-gray">
                Episode: {{ result.episode }}
              </p>
              <p class="f6 flex justify-around lh-copy measure mt2 mid-gray">
                <a
                  class="w-25 no-underline tc pointer br2 ba b--navy bg-dark-blue white pa2 ml1 mv1 bg-animate hover-bg-navy border-box"
                  href="{{ result.url }}"
                  >Link</a
                >
                <button
                  (click)="onFavorite(result.id)"
                  class="w-25 tc pointer br2 ba b--dark-green bg-green white pa2 ml1 mv1 bg-animate hover-bg-dark-green border-box"
                  type="button"
                >
                  Fav
                </button>
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeListComponent {
  searchForm;
  error$ = new Subject<string>();

  episodes$: Observable<Episodes> = this.episodesService.episodes$.pipe(
    catchError((error) => {
      this.error$.next(error);
      return EMPTY;
    })
  );

  private episodeNameSubject = new BehaviorSubject<string>('');
  episodeNameAction$ = this.episodeNameSubject.asObservable();

  vm$ = combineLatest(
    this.episodes$.pipe(pluck('results')),
    this.episodeNameAction$
  ).pipe(
    map(
      ([results, episodeName]: [ResultsEntity[] | null | undefined, string]) =>
        results?.filter((result) =>
          episodeName
            ? result.name.toLowerCase().includes(episodeName.toLowerCase())
            : true
        )
    )
  );

  constructor(
    private formBuilder: FormBuilder,
    private episodesService: EpisodesService
  ) {
    this.searchForm = this.formBuilder.group({
      name: '',
    });
  }

  onSubmit(episodeSearch: EpisodeSearch) {
    this.episodeNameSubject.next(episodeSearch.name);
    this.searchForm.reset();
  }

  onFavorite(episodeId: number): void {
    this.episodesService.addFavorite(episodeId);
  }
}
