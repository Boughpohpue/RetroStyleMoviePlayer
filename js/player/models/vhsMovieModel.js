class vhsMovieModel {
	id = "tt000000";
	title = "_title";
	locTitle = "_locTitle";
	year = 0;
	genres = "_genres";
	locGenres = "_locGenres";
	posterUrl = "_posterUrl";
	trailerUrl = "_trailerUrl";
	movieFilePath = "_localFileUrl";
	duration = 0;
	width = 0;
	height = 0;

	constructor(id, title, genres, localFileUrl) {
		this.id = id;
		this.title = title;
		this.genres = genres;
		this.movieFilePath = localFileUrl;
	}

	updateDuration(d) {
		this.duration = d;
	}
	updateSize(w, h) {
		this.width = w;
		this.height = h;
	}
}

class VhsMovie {
	id = "tt000000";
	year = 0;
	title = "_title";
	locTitle = "_locTitle";
	genres = "_genres";
	locGenres = "_locGenres";
	localPath = "_localPath";
	duration = 0;
	width = 0;
	height = 0;
	constructor(id, year, title, locTitle, genres, locGenres, localPath) {
		this.id = id;
		this.year = year;
		this.title = title;
		this.locTitle = locTitle;
		this.genres = genres;
		this.locGenres = locGenres;
		this.localPath = localPath;
		this.duration = 0;
		this.width = 0;
		this.height = 0;
	}

	getTitle(localized) {
		return localized ? this.locTitle : this.title;
	}
	getGenres(localized) {
		return localized ? this.locGenres : this.genres;
	}
	getYear(localized) {
		return localized ? `${this.year}r.` : `${this.year}`;
	}
	getGenresAndYear(localized, separator = " ") {
		return `${this.getGenres(localized)}${separator}${this.getYear(localized)}`;
	}

	updateDuration(d) {
		// console.log("upd movie duration " + d);
		this.duration = d;
	}
	updateSize(w, h) {
		// console.log("upd movie size " + w + "x" + h);
		this.width = Math.floor(w);
		this.height = Math.floor(h);
	}
}
