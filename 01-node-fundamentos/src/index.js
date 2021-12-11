const express = require("express");

const app = express();

app.use(express.json());

/* 
    Tipos de parâmetros
    Route params => Identificar um recurso editar/deletar/buscar
    Query Params => Paginação/ Filtro
    Body Params => Os objetos inserção/alteração (Json)
*/

app.get("/courses", (reques, response) => {
  const query = reques.query;
  console.log(query);
  return response.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (request, response) => {
  const body = request.body;
  console.log(body);
  return response.json(["Curso 1", "Curso 2", "Curso 3", "Curson 4"]);
});

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json(["Curso 6", "Curso 7", "Curso 3", "Curson 4"]);
});

app.delete("/courses/:id", (request, response) => {
  return response.json(["Curso 6, curso 7, curso 3"]);
});

app.listen(3333);
