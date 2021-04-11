import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
    </div>
  `,
  styles: [],
})
export class EpisodeListComponent {
  searchForm;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      episode: '',
    });
  }

  onSubmit(val: EpisodeSearch) {
    console.log(val)
    this.searchForm.reset();
  }
}
