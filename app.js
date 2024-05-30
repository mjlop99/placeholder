const express = require("express");
const axios = require("axios");
const app = express();
const PUERTO = 3000;

app.use(express.json());



//GET donde pueda devolver todos los datos=> http://localhost:3000/todos
app.get("/todos", async (req, res) => {
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    res.json(respuesta.data);
  } catch (error) {
    console.error("Error al obtener todos los datos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//GET donde se puede consultar por id especifico y mapear que solo se muestre el title. => http://localhost:3000/todos/1

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const respuesta = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    res.json({ title: respuesta.data.title });
  } catch (error) {
    console.error("Error al obtener los datos por id:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//GET donde se pueda consultar por el title y devuelva todos los campos.=> http://localhost:3000/title/delectus%20aut%20autem


app.get("/title/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const data = respuesta.data.filter((todo) => todo.title === title);
    res.json(data);
  } catch (error) {
    console.error("Error al obtener los datos por titulo:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//GET se puede mostrar n documentos => http://localhost:3000/todos/limit/5

app.get("/todos/limit/:limit", async (req, res) => {
    const  {limit}  = req.params;
    try {
      const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
      res.json(respuesta.data);
    } catch (error) {
      console.error("Error al obtener los documentos:", error.message);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  

app.listen(PUERTO, () => {
  console.log(`Servidor API en ejecución en http://localhost:${PUERTO}`);
});

