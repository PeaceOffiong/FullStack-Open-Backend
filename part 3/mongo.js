const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const dbUrl = `mongodb://peacebaby:${password}@ac-tfgtzid-shard-00-00.etyajzc.mongodb.net:27017,ac-tfgtzid-shard-00-01.etyajzc.mongodb.net:27017,ac-tfgtzid-shard-00-02.etyajzc.mongodb.net:27017/?ssl=true&replicaSet=atlas-8y2ixt-shard-0&authSource=admin&retryWrites=true&w=majority`;


mongoose.set("strictQuery", false);
mongoose
  .connect(dbUrl)
  .then(() => console.info("connected to DB"))
  .catch((e) => {
    console.log("error", e);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact",contactSchema);

if (process.argv.length === 3) {
  Contact.find({}).then(result => {
    console.log("phonebook:");
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

const firstName = process.argv[3];
const lastName = process.argv[4];
const personNumber = process.argv[5];


const contact = new Contact({
  name: firstName,lastName,
  number: personNumber,
});

contact.save().then((result) => {
  console.log(`added ${firstName} ${lastName} number ${personNumber} to phonebook`);
  mongoose.connection.close();
});