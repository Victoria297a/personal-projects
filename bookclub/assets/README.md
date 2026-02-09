# Bookclub Hub - Assets

## Folder Structure

```
assets/
├── images/
│   └── covers/          # Local placeholder for future book cover uploads
├── data/
│   └── books.json      # Central book database with metadata
├── cover-styles.css    # Cover image styling
└── book-loader.js      # JavaScript utility for loading books
```

## Book Data Source

All book cover images are sourced from **Open Library** (openlibrary.org), a free and open-source project that provides:

- Free access to book covers via their Cover API
- No authentication required
- Reliable CDN delivery
- Full metadata for millions of books

### Example URLs:
```
https://covers.openlibrary.org/b/isbn/ISBN_NUMBER-M.jpg
https://covers.openlibrary.org/b/id/OPENLIBRARY_ID-M.jpg
```

Sizes available:
- `-S.jpg` (Small: ~50px)
- `-M.jpg` (Medium: ~100px)
- `-L.jpg` (Large: ~200px)

## Using the Book Data

The `books.json` file contains all featured books with:
- Title, author, ISBN
- Plot summary
- Genres and ratings
- Cover URL from Open Library

You can fetch this data in your JavaScript:

```javascript
const books = await fetch('assets/data/books.json').then(r => r.json());
```

## Adding New Books

Edit `assets/data/books.json` and add entries following this schema:

```json
{
  "id": 14,
  "title": "Book Title",
  "author": "Author Name",
  "isbn": "9780000000000",
  "plot": "Short plot description",
  "genre": "Genre",
  "rating": 4.5,
  "ratingCount": 1234,
  "coverUrl": "https://covers.openlibrary.org/b/isbn/9780000000000-M.jpg"
}
```

To find the ISBN for a book, visit [openlibrary.org](https://openlibrary.org) and search for the title.
