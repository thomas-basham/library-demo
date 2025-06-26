const state = {
  currentPage: 1,
  currentTitle: "",
};

async function searchBookByTitle(title, page) {
  state.currentTitle = title;
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${title}&lang=eng&limit=5&page=${page}`
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

function renderBooks(bookData) {
  const booksContainer = document.getElementById("book-container");
  booksContainer.innerHTML = "";
  booksContainer.className = "border-2 p-5 border-rose-300";

  bookData.docs.forEach((book) => {
    const bookElem = document.createElement("div");
    bookElem.className = "border-2 p-5 border-rose-300 text-rose-500";

    const authorElement = document.createElement("p");
    authorElement.innerHTML = book.author_name?.[0] || "Author not found";
    authorElement.className = "font-bold";

    const titleElement = document.createElement("p");
    titleElement.innerHTML = book.title;

    bookElem.appendChild(authorElement);
    bookElem.appendChild(titleElement);

    booksContainer.appendChild(bookElem);
  });
}

async function handleSubmitTitleSearch(event) {
  event.preventDefault();

  const title = event.target["search-title"].value;
  console.log(title);

  const data = await searchBookByTitle(title, state.currentPage);

  // call our function to render the data
  renderBooks(data);

  // call our function to render pagination ui
  renderPagination(data.numFound);
}

function renderPagination(numFound) {
  const totalPages = Math.ceil(numFound / 5);

  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.className =
    "border-2 p-2 hover:cursor-pointer hover:bg-inherit bg-rose-300 text-rose-50 hover:text-rose-500";

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.className =
    "border-2 p-2 hover:cursor-pointer hover:bg-inherit bg-rose-300 text-rose-50 hover:text-rose-500";
  nextButton.disabled = state.currentPage === totalPages;
  nextButton.onclick = async () => {
    state.currentPage++; // increase the page number
    const data = await searchBookByTitle(state.currentTitle, state.currentPage);

    renderBooks(data);
    renderPagination(data.numFound);
  };

  const pageCountElem = document.createElement("p");
  pageCountElem.className = "text-rose-500";
  pageCountElem.innerHTML = `Page ${state.currentPage} of ${totalPages}`;

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageCountElem);
  paginationContainer.appendChild(nextButton);
}
