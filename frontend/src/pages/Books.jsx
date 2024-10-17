import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await fetch("http://localhost:8800/books");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <div>
      <h1>The book shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            {book.cover && <img src={book.cover} alt="" />}

            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <span>{book.price}</span>
          </div>
        ))}
      </div>
      <Link to={"/add"}>
        <button>Add book</button>
      </Link>
    </div>
  );
};

export default Books;
