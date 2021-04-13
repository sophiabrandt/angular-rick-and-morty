# Rick And Morty

First Angular application using the ideas from Deborah Kurata's talk [Data Composition with RxJS](https://www.youtube.com/watch?v=Z76QlSpYcck).

Thanks to the maintainers of [The Rick and Morty API](https://rickandmortyapi.com/).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

## Development server

Install dependencies with npm or [pnpm](https://pnpm.io).

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run the json server via `npm run json-server`.

### Local HTTPS

Use [Caddy](https://caddyserver.com/) for local development with HTTPS.

```sh
caddy run
npm run start # or pnpm run start
npm run json-server # or pnpm run json-server
```

Go to [https://rickandmorty.caddy.localhost:4444](https://rickandmorty.caddy.localhost:4444) for the Angular app.  
Go to [https://rickandmortyapi.caddy.localhost:4444](https://rickandmortyapi.caddy.localhost:4444) for the development API.
