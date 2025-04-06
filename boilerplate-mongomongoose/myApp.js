require('dotenv').config();
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for pearson 
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create a model for person schema
const Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  // Create a instance of Person 
  const persona = new Person({ name: 'eli' ,age:28,favoriteFoods:['mole']});
  // Call the method save
  // Return callback as last argument
  persona.save(function(err, data) {
    done(null,data)
})

};


arrayOfPeople = [
  { name: 'eli1' ,age:28,favoriteFoods:['mole']},
  { name: 'eli2' ,age:28,favoriteFoods:['mole']},
]

const createManyPeople = (arrayOfPeople, done) => {
  // Call a statuc method for Person to create a list of documents in database in table person
  Person.create(arrayOfPeople,function(err, data) {
    if (err) return console.log(err)
    done(null,data)
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(error,data)=>{
    if (error) return console.log(error)
      done(null,data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(error,data)=>{
    if (error) return console.log(error)
      done(null,data)
  })
};

const findPersonById = (personId, done) => {
  Person.findOne({_id:personId},(error,data)=>{
    if (error) return console.log(error)
      done(null,data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findOne({_id:personId},(error,response)=>{
    response.favoriteFoods.push(foodToAdd)
    response.save((error,response)=>{
      if (error) return console.log(error)
        done(null,response)
    })
    });
  }

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(error,response)=>{
    if (error) return console.log(error)
      done(null,response)
  })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},(error,response)=>{
    if (error) return console.log(error)
      done(null,response)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(error,response)=>{
    if (error) return console.log(error)
      done(null,response)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort("name").limit(2).select('name').exec((error,response)=>{
    console.log(response)
    if (error) return console.log(error)
      done(null,response)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
