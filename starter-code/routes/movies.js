const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie");
const Celebrity = require("../models/celebrity");

/* GET movies page */
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then(movies => {
      //console.log(movies);
      res.render("movies", { movies });
    })
    .catch(error => {
      console.log(error);
    });
});

/* ADD new movie - GET */
router.get("/movies/new", (req, res, next) => {
  res.render("movies/new");
});

/* ADD new movie - POST  */
router.post("/movies/new", (req, res, next) => {
  const { title, genre, plot } = req.body;
  const newMovie = new Movie({ title, genre, plot });
  newMovie
    .save()
    .then(movie => {
      res.redirect("/movies");
    })
    .catch(error => {
      console.log(error);
    });
});

/* POST route to delete movie */
router.post("/movies/:id/delete", (req, res, next) => {
  let movieId = req.params.id;
  Movie.findByIdAndRemove({ _id: movieId })
    .then(movie => {
      res.redirect("/movies");
    })
    .catch(error => {
      console.log(error);
    });
});

// /* Edit a movie - GET */
// router.get('/movies/edit/:id', (req, res, next) => {
//   let movieId = req.params.id;
// Movie.findOne({'_id': movieId})
//     .then(movie => {
//       res.render("movies/edit", { movie });
//     })
//     .catch(error => {
//       console.log(error)
//     })
//   });

//______________________________________________
/* ADD new celebrity to a movie - GET */
router.get("/movies/:id/addcelebrity", (req, res, next) => {
  let movieId = req.params.id;
  Movie.findOne({ _id: movieId })
    .then(movie => {
      res.render("movies/addcelebrity", { movie });
    })
    .catch(error => {
      console.log(error);
    });
});

/* ADD new celbrity to a movie - POST */
router.post("/movies/:id/addcelebrity", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCeleb = new Celebrity({ name, occupation, catchPhrase });
  newCeleb.save(function(err, celeb) {
    if (err) console.log(err);
    Movie.findByIdAndUpdate(req.params.id, {$push: {actors: celeb._id }}).then(
      movie => {
        console.log(movie);
        res.redirect("/movies/" + req.params.id);
      }
    );
  });
});

//________________________________________________

/* GET movies details page */
router.get("/movies/:id", (req, res, next) => {
  let movieId = req.params.id;
  Movie.findOne({ _id: movieId }).populate('actors')
    .then(movie => {
      res.render("movies/show", { movie });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
