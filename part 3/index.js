require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Contact = require("./models/contacts");
const morgan = require("morgan");

app.use(express.static("build"));
app.use(cors());
app.use(morgan(":method :url :status :request-data"));
app.use(express.json());

const errorHandler = (error, request, response , next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error)
}

const unKnownEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
}


morgan.token("request-data", function (req, res) {
  return JSON.stringify(req.body);
});

morgan.token("type", function (req, res) {
  return req.data;
});

app.get("/", (request, response) => {
  response.send("<h1>Hurray! You have access to this API</h1>");
});

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/info", (request, response) => {
  response.send(
    `<h2>Phonebook has info for ${data.length} people</h2> <p>${Date()}</p>`
  );
  console.log(request);
});

app.get("/api/persons/:id", (request, response,next) => {
  Contact.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  })
    .catch(error => next(error))
});

app.delete("/api/persons/:id", (request, response) => {
  console.log(request.params.id)
  Contact.findByIdAndRemove(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const contact = request.body;
  if ((!contact.name && !contact.number) || !contact.name || !contact.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const contactBody = new Contact({
    name: contact.name,
    number: contact.number,
  });
  contactBody.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.put("/api/persons/:id", (request, response) => {
  const body = request.body;

  const contactP = {
    name: body.name,
    number: body.number
  }
  Contact.findByIdAndUpdate(request.params.id, contactP, { new: true }).then(result => {
    response.json(result)
    console.log(result);
  })
    .catch(error => next(error));
})

app.use(unKnownEndPoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
