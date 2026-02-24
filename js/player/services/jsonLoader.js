const vhsMoviesCollection = [];

function fetchMoviesFromJson(jsonFilePath) {
  $.getJSON(jsonFilePath, function (data) {
    return data.movies.map((f) => new VhsMovie(f.id, f.year, f.title, f.movieFilePath));
  });
}
