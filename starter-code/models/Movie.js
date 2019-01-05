const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    actors: [ { type : mongoose.Schema.Types.ObjectId, ref: 'Celebrity' } ] // Added for linking celebrities and movies
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Movie = mongoose.model("Movie", movieSchema);


module.exports = Movie;
