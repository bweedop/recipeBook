const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    required: true,
  },
  ingredients: {
    type: Array,
    minlength: 1,
    required: true,
  },
  description: {
    type: String,
    minlength: 5,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Recipe', recipeSchema)
