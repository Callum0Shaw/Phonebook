const { request } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "04-1234567",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "04-2345678",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "04-3456789",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "04-7654321",
  },
];

app.get("/", (request, response) => {
  response.send("<h2>Hello, World!<h2>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  response.json(person);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length}</p>
    <p>${Date()}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
