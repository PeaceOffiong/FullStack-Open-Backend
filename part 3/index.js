const express = require("express");
const app = express();

const data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hurray! You have access to this API</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/info", (request, response) => {
  response.send(
    `<h2>Phonebook has info for ${data.length} people</h2> <p>${Date()}</p>`
  );
  console.log(request);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const contact = data.find((phoneContact) => phoneContact.id === id);
  if (contact) {
    response.json(contact);
  } else {
    response.status(404).end();
  }
});

app.delete("api/persons/:id", (request, reponse) => {
    const id = Number(request.params.id);
    data = data.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port`);
});