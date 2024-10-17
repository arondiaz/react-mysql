import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book deleted successfully");
  });
});

app.get("/update/:id", (req, res) => {
  const bookToUpdate = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";
  db.query(q, [bookToUpdate], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});


app.put("/update/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book updated successfully");
  });
});

const PORT = 8800;

app.listen(PORT, () => {
  console.log(`Backend connected on port ${PORT}`);
});
