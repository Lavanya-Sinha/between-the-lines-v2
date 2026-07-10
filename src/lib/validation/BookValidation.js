export const BookValidation = ({ title, author, genres }) => {
  const trimTitle = title.trim();
  const trimAuthor = author.trim();
  const trimGenres = genres
     .split(",")
    .map((genre) => genre.trim())
    .filter(Boolean);

  if (!trimTitle) {
    return {
      success: false,
      error: "Title Cannot Be Empty.",
    };
  }
  if (!trimAuthor) {
    return {
      success: false,
      error: " Author Cannot Be Empty!",
    };
  }

  if(trimGenres.length > 8){
  return{
    success: false,
    error: "You can only have upto 8 genres."
  }
  }
  for (const genre of trimGenres) {
  if (genre.length > 20) {
    return {
      success: false,
      error: "Please enter shorter genre names."
    };
  }
}
  return {
    success: true,
    data: {
      title: trimTitle,
      author: trimAuthor,
      genres: [...new Set(trimGenres)]
    },
  };
};
