const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const port = 8080;
const app = express();
const cors = require("cors")
//Connecting server to database
// mongoose
//   .connect("mongodb://localhost/prep45", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Server is connected to Database");
//   })
//   .catch((e) => console.error(e));
var uri = 'mongodb+srv://kushal:Kushal24@cluster0.q2aawhd.mongodb.net/test';
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.json());
app.use(cors())
app.use(express.static("../client/build"));

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

//API To get all Books

app.get("/api/books", async (req, res) => {
  try {
    let allBooks = await Book.find();
    res.json(allBooks);
  } catch (error) {
    res.json({ status: "Unable to fetch Books", message: error.message });
  }
});
// // API to add a new book
app.post("/api/books", async (req, res) => {
  try {
    let newBook = await Book.create(req.body);
    res.json({ status: "Book is Added to the Inventory", data: newBook });
  } catch (error) {
    res.json({
      status: "Unable to add book to the Inventory",
      message: error.message,
    });
  }
});

// Remove a book
app.delete("/api/books/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    let deletedBook = await Book.findByIdAndDelete(_id);
    res.json({ status: "Book is deleted from the Inventory", data: deletedBook });
  } catch (error) {
    res.json({
      status: "Unable to delete book from the Inventory",
      message: error.message,
    });
  }
});

//Server Is listening 
app.listen(port, () => {
  console.log("Server is Listening on port 8080");
});
