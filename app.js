async function searchBookByTitle(title) {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${title}&limit=10&page=1`
    );
    if (!response.ok) {
      throw new Error("Network error. Status: ", response.status);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("ERROR Fetching by title: ", error.message);
  } finally {
    console.log("Finished fetching by title");
  }
}

async function handleSubmitTitleSearch(event) {
  event.preventDefault();

  const title = event.target["search-title"].value;
  console.log(title);

  const data = await searchBookByTitle(title);

  // call our function to render the data
  renderBooks(data);
}

function renderBooks(bookData) {
  const booksContainer = document.getElementById("book-container");
  booksContainer.className = "border-2 p-5 border-rose-300";

  bookData.docs.forEach((book) => {
    const bookElem = document.createElement("div");
    bookElem.className = "border-2 p-5 border-rose-300 text-rose-500";

    const authorElement = document.createElement("p");
    authorElement.innerHTML = book.author_name[0];
    authorElement.className = 'font-bold'

    const titleElement = document.createElement("p");
    titleElement.innerHTML = book.title;

    bookElem.appendChild(authorElement);
    bookElem.appendChild(titleElement);

    booksContainer.appendChild(bookElem);
  });
}
