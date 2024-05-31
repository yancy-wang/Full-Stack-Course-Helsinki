const mongoose = require('mongoose');
require('dotenv').config();

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = process.env.MONGODB_URI;

if (!url) {
  console.error('Error: MONGODB_URI is not defined in the .env file');
  process.exit(1);
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const initialPersons = [
  {
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
];

if (process.argv.length === 3) {
  // If only the password is provided, populate the initial entries
  Person.insertMany(initialPersons)
    .then(() => {
      console.log('Initial phonebook entries added');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error adding initial entries:', err);
      mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
  // If name and number are also provided, add the new entry to the phonebook
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Please provide the name and number as arguments: node mongo.js <password> <name> <number>');
  mongoose.connection.close();
}
