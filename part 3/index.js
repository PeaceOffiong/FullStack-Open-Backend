const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

let data = [
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

const morgan = require("morgan");
// app.use(morgan("tiny"));
app.use(morgan(":method :url :status :request-data"));
morgan.token("request-data", function (req, res){
  return JSON.stringify(req.body)
  })


morgan.token("type", function (req, res) {
  return req.data;
})

app.use(express.json());

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

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  data = data.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const id = Math.floor(Math.random() * (30002002 - 2000 + 1) + 2000)
  console.log(id)
  return id;
}

app.post("/api/persons", (request, response) => {
  const contact = request.body;
  const exsitingContact = data.find(econtact => econtact.name === contact.name)

  if ((!contact.name && !contact.number) || !contact.name || !contact.number) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (exsitingContact) {
    return response.status(400).json({
      error:"name should be unique"
    })
  }

  const contactBody = {
    name: contact.name,
    number: contact.number,
    id: generateId()
  } 
  data.push(contactBody);
  response.json(contactBody);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
