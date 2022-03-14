const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = document.getElementsByTagName("input");
const entryTextSection = document.getElementById("entry-text");
const confirmDelete = document.getElementById("delete-modal");

const listRoot = document.getElementById("movie-list");

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const deleteMovieHandler = (movieId) => {
  confirmDelete.classList.add("visible");
  toggleBackdrop();

  const confirmDeleteNo = document.querySelector(".delete-confirm-no");
  let confirmDeleteYes = document.querySelector(".delete-confirm-yes");

  confirmDeleteYes.replaceWith(confirmDeleteYes.cloneNode(true)); // replaces the 'Yes' button with a deep clone

  confirmDeleteYes = document.querySelector(".delete-confirm-yes"); // retargeting to the cloned 'Yes' button

  // confirmDeleteYes.removeEventListener("click", deleteMovieHandler);

  confirmDeleteNo.removeEventListener("click", cancelMovieDeletion);
  confirmDeleteNo.addEventListener("click", cancelMovieDeletion);
  confirmDeleteYes.addEventListener("click", deleteMovie.bind(null, movieId));

  //deleteMovie(movieId);
};

// Deleting a movie using it's movie.id then looping through the movies array to find which one to delete.
const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  listRoot.children[movieIndex].remove();
  movies.splice(movieIndex, 1); // deletes the values in the movies array
  // removes the elements in the DOM (newer way)
  // listRoot.removeChild(listRoot.children[movieIndex]); //can also be used for browser support
  cancelMovieDeletion();
};

const cancelMovieDeletion = () => {
  toggleBackdrop();
  confirmDelete.classList.remove("visible");
};

const renderNewMovieElement = (id, title, imageURL, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageURL}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating} out of 5 stars</p>
    </div>
    `;
  newMovieElement.addEventListener(
    "dblclick",
    deleteMovieHandler.bind(null, id)
  );
  listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const clearMovieInputs = () => {
  for (const input of userInputs) {
    input.value = "";
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInputs();
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageURLValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageURLValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue > 5 ||
    +ratingValue < 1
  ) {
    alert("Please enter valid inputs. (rating should be 1 - 5)");
    return;
  }

  const newMovie = {
    id: Math.random().toString(), //used for deleting later
    title: titleValue,
    image: imageURLValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
