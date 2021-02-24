require("dotenv").config();
const { request } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Entry = require("./models/phonebook");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(morgan(":method :url :status :response-time ms :body"));

morgan.token("body", (req, res) => JSON.stringify(req.body));

const nameExists = (name) => {
  return !persons.find((person) => person.name === name);
};

app.get("/", (request, response) => {
  response.send("<h2>Hello, World!<h2>");
});

app.get("/api/persons", (request, response) => {
  Entry.find({}).then((entries) => {
    response.json(entries);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Entry.findById(request.params.id).then((entry) => response.json(entry));
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length}</p>
    <p>${Date()}</p>`
  );
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log("Body:", body);
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const newEntry = new Entry({
    name: body.name,
    number: body.number,
  });

  newEntry.save().then((savedEntry) => {
    response.json(savedEntry);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log(id);
  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
