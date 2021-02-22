const { request } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :response-time ms :body"));

morgan.token("body", (req, res) => JSON.stringify(req.body));

const generateId = () => Math.floor(Math.random() * 100000000);

const nameExists = (name) => {
  return !persons.find((person) => person.name === name);
};

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

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length}</p>
    <p>${Date()}</p>`
  );
});

app.put("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "Name missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "Number missing",
    });
  }
  if (!nameExists(body.name)) {
    return response.status(400).json({
      error: "Name already exists",
    });
  }
  const id = generateId();

  const newPerson = {
    id: id,
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);

  response.json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log(id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
