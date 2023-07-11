import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [books, setBooks] = useState();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || author.trim() === "") {
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/books", { name, author });
      setName("");
      setAuthor("");
      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="App">
      <h1>Book Inventory</h1>
      <form onSubmit={addBook}>
        <input
          type="text"
          placeholder="Book Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
      {/* {console.log(books)} */}
      <ul>
        {books.length >0 ? (
          books.map((book) => (
            <li key={book._id}>
              {book.name} by {book.author}
              <button onClick={() => deleteBook(book._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No books found</li>
        )}
      </ul>
    </div>
  );
}

export default App;
