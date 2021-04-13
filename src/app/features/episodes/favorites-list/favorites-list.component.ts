import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rm-favorites-list',
  template: `
  <section class="pa2 pa4-ns">
  <article class="ba b--black-10 br2 bg-near-white pa4 mw6 center">
    <div>
      <h4 class="f5 fw4 black-60 dib v-mid mv0 mr3">Favorites</h4>
    </div>
    <ul class="list f6 pl0 mt3 mb0">
      <li class="pv2">
        <a href="#" class="link dark-green lh-title">
          <span class="fw7 underline-hover">Pilot</span>
        </a>
        <button class="ml2 bn pointer" type="button">&#10007;</button>
      </li>
    </ul>
  </article>
</section>

  `,
  styles: [
  ]
})
export class FavoritesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
