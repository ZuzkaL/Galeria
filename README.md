# Galeria

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

* You need to turn off yours CORS, here is command for windows: ./chrome.exe --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Hosting
Firstly you need to allow site to view on this link.  (https://api.programator.sk/gallery)
Then you can load from this site. (https://bart-galeria.web.app/categories)


# Added Features

- Animations (on hover over cards)
- Filtering and sorting based on the name
- Delete of category
- Delete of image
- Hosting

---

# Nápady na doplnenie

- loading (skeleton loader)
- dark mode podľa toho ako je nastavený systém (vytvoriť tmavú verziu)
- filtrovanie a sortovanie kategórií (podľa počtu obrázkov + vyhľadať podľa názvu)
- delete na veci (kategória a obrázok)
- hosting

## TODO

### celkovo - features
- posuvanie sa v obrazkoch
- loading 

### celkovo - nice to have
- dialogove okna (responyivnost pri mobile)
- errory osetrit
- sirka karticky na jednom mieste
- ak su vacsie texty tak zarovnat aby boli 3 bodky
- dark mode podľa toho ako je nastavený systém
- osetrit ze ak je obrazok v all galerii ale nie je v db, tak neukazovat
- cors policy pri nahrati obrazka
- osetrit aby to bolo co najlepsie
    - vymazat importy zbytocne
    - prejst kazdy subor a poriesit co je naviac
    - pokomentovat kod
- poformatovat vsetko
