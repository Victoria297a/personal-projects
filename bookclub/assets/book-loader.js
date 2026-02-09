// Load book data from JSON and populate UI
async function loadBookData() {
  try {
    const response = await fetch("assets/data/books.json");
    const books = await response.json();
    window.booksData = books;
    return books;
  } catch (error) {
    console.error("Error loading book data:", error);
    return [];
  }
}

// Helper to get a book by ID
function getBook(id) {
  return window.booksData?.find((b) => b.id === id);
}

// Render book cover with image
function renderBookCover(book, showMeta = false) {
  const coverDiv = document.createElement("div");
  coverDiv.className = "cover";

  if (book.coverUrl) {
    const img = document.createElement("img");
    img.src = book.coverUrl;
    img.alt = book.title;
    img.onerror = () => {
      img.style.display = "none";
      coverDiv.appendChild(createFallbackCover(book));
    };
    coverDiv.appendChild(img);
  } else {
    coverDiv.appendChild(createFallbackCover(book));
  }

  if (showMeta) {
    const author = document.createElement("span");
    author.textContent = book.author;
    coverDiv.appendChild(author);
  }

  return coverDiv;
}

// Fallback styled cover when image fails
function createFallbackCover(book) {
  const fallback = document.createElement("div");
  fallback.style.cssText = `
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background: linear-gradient(160deg, #e9dccd, #f7efe5);
    padding: 10px;
    text-align: center;
    font-weight: 700;
    font-size: 11px;
    color: #5e4a35;
    border-radius: 8px;
  `;
  fallback.textContent = book.title;
  return fallback;
}

// Initialize book data on page load
document.addEventListener("DOMContentLoaded", loadBookData);
