const state = {
  currentPage: 1,
  currentTitle: "",
  bookData: [],
  isSortedAscending: true,
  isRateLimit: false,
};

async function searchBookByTitle(title, page) {
  state.currentTitle = title;
  state.isRateLimit = true;

  try {
    renderLoading();
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${title}&language=eng&limit=5&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network error. Status: ", response.status);
    }

    const data = await response.json();
    state.bookData = data.docs;

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

  bookData.forEach((book) => {
    const bookElem = document.createElement("div");
    bookElem.className = "border-2 p-5 border-rose-300 text-rose-500 ";

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

function renderPagination(numFound) {
  const totalPages = Math.ceil(numFound / 5);

  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.className =
    "border-2 p-2 hover:cursor-pointer hover:bg-inherit bg-rose-300 text-rose-50 hover:text-rose-500";
  prevButton.disabled = state.currentPage === 1;
  prevButton.onclick = async () => {
    state.currentPage--; // decrease the page number
    const data = await searchBookByTitle(state.currentTitle, state.currentPage);

    renderBooks(state.bookData);
    renderPagination(data.numFound);
  };

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.className =
    "border-2 p-2 hover:cursor-pointer hover:bg-inherit bg-rose-300 text-rose-50 hover:text-rose-500";
  nextButton.disabled = state.currentPage === totalPages;
  nextButton.onclick = async () => {
    state.currentPage++; // increase the page number
    const data = await searchBookByTitle(state.currentTitle, state.currentPage);

    renderBooks(state.bookData);
    renderPagination(data.numFound);
  };

  const pageCountElem = document.createElement("p");
  pageCountElem.className = "text-rose-500";
  pageCountElem.innerHTML = `Page ${state.currentPage} of ${totalPages}`;

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageCountElem);
  paginationContainer.appendChild(nextButton);
}

function renderLoading() {
  const booksContainer = document.getElementById("book-container");
  booksContainer.innerHTML = "";

  const loadingGif = document.createElement("img");
  loadingGif.src =
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExanBwc2gxZjQwemMzM2NlaXFxd2RzaTdodzM5cDIwbHcwaWw1OXhqYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif";
  loadingGif.width = "200";

  booksContainer.appendChild(loadingGif);
}

function renderSortButton() {
  document.getElementById("sorting").innerHTML = "";
  const sortButton = document.createElement("button");
  sortButton.innerHTML = "Sort &#x21C5;";
  sortButton.className =
    "text-rose-500 border-1 border-rose-500 p-2 my-2 rounded-xl cursor-pointer";

  sortButton.onclick = () => {
    state.isSortedAscending = !state.isSortedAscending;

    console.log(state.bookData);

    state.bookData.sort((x, y) => {
      if (state.isSortedAscending) {
        if (x.title < y.title) return -1;
        if (x.title > y.title) return 1;
        return 0;
      } else {
        if (x.title < y.title) return 1;
        if (x.title > y.title) return -1;
        return 0;
      }
    });

    renderBooks(state.bookData);
    console.log(state.bookData);
  };

  document.getElementById("sorting").appendChild(sortButton);
}

async function handleSubmitTitleSearch(event) {
  event.preventDefault();

  const title = event.target["search-title"].value;
  console.log(title);

  if (state.isRateLimit === false) {
    const data = await searchBookByTitle(title, state.currentPage);
    // call our function to render the data
    renderBooks(state.bookData);

    // call our function to render pagination ui
    renderPagination(data.numFound);

    renderSortButton();
  } else {
    alert("Calm down!! wait a couple seconds between requests dude.");
    return;
  }

  setTimeout(() => (state.isRateLimit = false), 2000);
}
