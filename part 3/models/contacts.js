require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;

console.log(`Connecting to ${URL}`);

mongoose.set("strictQuery", false);
mongoose
  .connect(URL)
  .then(() => console.info("connected to DB"))
  .catch((e) => {
    console.log("error", e);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  number: String,
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
