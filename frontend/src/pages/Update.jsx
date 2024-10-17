import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const Update = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    cover: "",
  });

  const navigate = useNavigate();
  const params = useParams()
  const idBook = params.id

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      input.title.trim() === "" ||
      input.description.trim() === "" ||
      input.price.trim() === ""
    ) {
      return;
    }

    const url = `http://localhost:8800/update/${idBook}`;
    try {
      const { title, description, price, cover } = input;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          cover,
        }),
      });
      navigate("/");
      console.log("Ok");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Update new book!</h1>
      <div className="form">
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="description"
        />
        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
        />
        <input
          type="text"
          placeholder="cover"
          onChange={handleChange}
          name="cover"
        />
      </div>
      <button onClick={handleClick} className="add">UPDATE</button>
    </div>
  );
};

export default Update;
