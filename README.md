# Gallery

This Angular project, generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13, serves as a gallery application.

## Development Server

To run the development server, follow these steps:

1. Install Angular CLI.
2. Run `npm i`
3. Run `ng serve` for a dev server.
4. Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to the source files.

Note: You might need to disable CORS for local development. If you are using Chrome on Windows, you can run the following command: `./chrome.exe --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials`.

# Added Features

- Animations (triggered on hover over cards)
- Filtering and sorting based on category names
- Deletion of categories
- Deletion of images
- Exclude categories that do not exist (for example, a category obtained through /gallery, and if requested in /gallery/{{path}}, it returns that the category does not exist)
- If the category name exceeds the expected length, it will add "..." to the end and trim the string
- Internationalization (i18n) for Slovak (sk) and English (en)

---

# Error Handling in Frontend

## /gallery

### GET
- **500:** Displayed text in the app indicates an internal error.

### POST
- **400:** Alert indicating that something is wrong.
- **409:** Text indicating that a category with this name already exists.
- **500:** Alert dialog indicating backend problems, advising to try again later.

## /gallery/$path

### GET
- **404:** Text indicating that this category does not exist.
- **500:** Alert dialog indicating backend problems, advising to try again later.

### DELETE
- **404:** Alert indicating that this gallery does not exist.
- **500:** Alert dialog indicating backend problems, advising to try again later.

### POST
- **400:** Alert indicating file not found.
- **404:** Window alert.
- **500:** Alert dialog indicating backend problems, advising to try again later.

## /images

### GET
- **404:** Photo not found, triggers an alert window.
- **500:** The photo cannot be generated, triggers an alert window.
