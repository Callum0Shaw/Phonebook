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

app.get("/", (request, response) => {
  response.send("<h2>Hello, World!<h2>");
});

app.get("/api/persons", (request, response) => {
  Entry.find({}).then((entries) => {
    response.json(entries);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Entry.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  Entry.find({}).then((result) => {
    response.send(
      `<p>Phonebook has info for ${result.length}</p>
      <p>${Date()}</p>`
    );
  });
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const newEntry = new Entry({
    name: body.name,
    number: body.number,
  });

  newEntry
    .save()
    .then((savedEntry) => {
      response.json(savedEntry);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  const entry = {
    name: body.name,
    number: body.number,
  };
  Entry.findByIdAndUpdate(request.params.id, entry, { new: true })
    .then((updatedEntry) => {
      response.json(updatedEntry);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

app.use(unknownEndpoint);

const unhandledError = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(404).send({ error: "Malformatted id" });
  } else if (error.name === "MongoError" || error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(unhandledError);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
