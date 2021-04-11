import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EpisodesService } from '../../episodes.service';
import { Episodes, ResultsEntity } from '../../episodes.entity';

import { of, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { pluck, catchError, map, shareReplay, tap } from 'rxjs/operators';

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
      <section class="flex flex-wrap" *ngIf="vm$ | async as vm">
        <div
          class="br2 ba dark-gray b--black-10 mv4 w-25-l mw5 mr4"
          *ngFor="let result of vm"
        >
          <article class="fl w-100 pa2">
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
              <p class="f6 lh-copy measure mt2 mid-gray">
                <a href="{{ result.url }}">Link</a>
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  `,
  styles: [],
})
export class EpisodeListComponent {
  searchForm;

  episodes$: Observable<Episodes> = this.episodesService.episodes$;

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

}
