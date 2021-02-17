/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs')



let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let allMovies = [];

app.get("/", (req, res) => res.render("pages/index", { allMovies }));

app.get("/myForm", (req, res) => res.render("pages/myForm"));


app.post("/myForm", (req, res) => {
    const { movies } = req.body; ///req.body, gets the content of the html item with that name
    allMovies = movies.split(",");
    res.redirect("/");
    // Add your implementation here 
});

app.get("/myListQueryString", (req, res) => {
    let queries = [];
    for (let query in req.query) {
        queries.push(req.query[query]);
    }
    allMovies = queries;
    res.redirect('/')
        // Add your implementation here
});

app.get("/search/:movieName", (req, res) => {
    const searchTerm = req.params.movieName;
    fs.readFile("./movieDescriptions.txt", "utf8", (err, file) => {
        if (err) {
            console.log(err);
        } else {
            const lineArray = file.split("\n");
            for (l of lineArray) {
                let [movieName, movieDescription] = l.split(":");
                if (movieName.toLowerCase() == searchTerm.toLowerCase()) {
                    res.render("pages/searchResult", { searchTerm, movieDescription });
                    return;

                }
            }
        }
    })
});

app.listen(3000, () => {
    console.log("Server is running on port 3000 🚀");
});