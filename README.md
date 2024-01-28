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
- Do not show category that do not exist (there was one category that I get by /gallery and if I asked for it in /gallery/{{path}} it returned that this category do not exist)
- If category name is longer that it should be, it will add ... to the end and trim string


# Error handling in frontend

## /gallery

### get
500: In <app-categories> there is written text. That shows that it is internal error. 

### post
400: Alert that says that something is wrong 
409: Text that says that kategory with this name exist 
500: Alert dialog that says there are backend problems, try again later. 

## /gallery/${path}

### get
404: Text that says that this category does not exist 
500: Alert dialog that says there are backend problems, try again later. 

### delete
404: Alert that this gallery does not exist 
500: Alert dialog that says there are backend problems, try again later. 

### post
400: Alert that file not found
404: window alert
500: Alert dialog that says there are backend problems, try again later. 

## /images

### get
404: Photo not found, alert 
500: The photo can not be generated, alert 
---


## TODO

- loading
- loaklizaciu
- dark mode
- upratat kod
- v spravnom poradi napisat importy
- pokomentovat
- poformatovat
- hosting


### celkovo - features
- loading 
- lokalizacia

### celkovo - nice to have
- dark mode podľa toho ako je nastavený systém

- osetrit aby to bolo co najlepsie
    - vymazat importy zbytocne
    - prejst kazdy subor a poriesit co je naviac
    - pokomentovat kod
- poformatovat vsetko
