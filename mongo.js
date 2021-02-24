const mongoose = require("mongoose");

const argv = process.argv;

// Ensure corrent command line argument
if (argv.length < 3 || argv.length > 5 || argv.length === 4) {
  console.log(
    "Ensure correct input: node mongo.js <password> {<name> <number>}"
  );
  process.exit(1);
}

//  Connect to the database
const password = argv[2];
const url = `mongodb+srv://phonebook:${password}@cluster0.71tkj.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model("Entry", entrySchema);

// Process get all request to the database
if (argv.length === 3) {
  Entry.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(entry);
    });
    mongoose.connection.close();
  });
}

// Process adding new entry to phoneboo
if (argv.length === 5) {
  const name = argv[3];
  const number = argv[4];

  const entry = new Entry({
    name: name,
    number: number,
  });

  entry.save().then((result) => {
    console.log(`Entry: ${entry} added to the database`);
    mongoose.connection.close();
  });
}
