import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EpisodesService } from '../../episodes.service';
import { Episodes, ResultsEntity } from '../../episodes.entity';

import { of, Subject, Observable, combineLatest } from 'rxjs';
import { pluck, catchError, map, shareReplay, tap } from 'rxjs/operators';

interface EpisodeSearch {
  episode: string;
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
            formControlName="episode"
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
        <div class="br2 ba dark-gray b--black-10 mv4 w-25-l mw5 mr4" *ngFor="let result of vm.results">
          <article
            class="fl w-100 pa2"
          >
            <img
              src="https://avatars.dicebear.com/api/bottts/{{
                result.episode
              }}.svg"
              class="db w-100 br2 br--top"
              alt="Photo of a kitten looking menacing."
            />
            <div class="pa2 ph3-ns pb3-ns">
              <div class="dt w-100 mt1">
                <div class="dtc">
                  <h3 class="f5 f4-ns mv0">{{ result.name }}</h3>
                </div>
                <div class="dtc tr">
                  <h2 class="f5 mv0">ID: {{ result.id }}</h2>
                </div>
              </div>
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

  constructor(
    private formBuilder: FormBuilder,
    private episodesService: EpisodesService
  ) {
    this.searchForm = this.formBuilder.group({
      episode: '',
    });
  }

  episodes$: Observable<Episodes> = this.episodesService.episodes$;

  vm$ = combineLatest(this.episodes$.pipe(pluck('results'))).pipe(
    map(([results]: [ResultsEntity[] | null | undefined]) => ({ results }))
  );

  onSubmit(val: EpisodeSearch) {
    console.log(val);
    this.searchForm.reset();
  }
}
