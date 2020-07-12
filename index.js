const express = require("express");
const app = express();
const PORT = process.env.PORT || 6001;
const path = require("path");

const movies = require("./data/moviesdata");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/pages/home.html"));
});

//get
app.get("/movies", (req, res) => {
  return res.json(movies);
});

//add
app.post("/movies", (req, res) => {
  const { id, title, ratings, year, genres } = req.body;
  const data = { id, title, ratings, year, genres };
  movies.push(data);

  res.send({
    message: "Data success ditambahkan",
    data:movies,

  });
});



app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;

  const movieID = movies.findIndex((movie) => movie.id === parseInt(id));


  movies.splice(movieID, 1);

  res.send({
      message: "Data berhasil dihapus",
      data: movies,
  });
});



//put
app.put("/movies/:id", (req, res) => {
  const { id } = req.params;

  const movieID = movies.findIndex((movie) => movie.id === parseInt(id));
  const newMovie = {
    id: parseInt(id),
    title,
    ratings,
    year,
    genres,
  };

  movies.splice(movieID,1, newMovie)

  res.send({
    message: "Data berhasil diubah",
    data: movies,
  });
});

app.listen(PORT, () => {
  console.log(`Server run on Port ${PORT}`);
});
