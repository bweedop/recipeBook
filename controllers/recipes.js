const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')

recipesRouter.get('/', (request, response) => {
  Recipe.find({}).then((recipes) => {
    response.json(recipes)
  })
})

recipesRouter.get('/:id', (request, response) => {
  Recipe.findById(request.params.id)
    .then((recipe) => {
      if (recipe) {
        response.json(recipe)
      } else {
        response.status(404).end()
      }
    })
    .catch((err) => {
      console.log(err)
      response.status(400).send({ error: 'Malformed ID' })
    })
})

recipesRouter.post('/', (request, response, next) => {
  const body = request.body

  const recipe = new Recipe({
    title: body.title,
    ingredients: body.ingredients,
    description: body.description,
    type: body.type,
  })

  recipe
    .save()
    .then((savedRecipe) => savedRecipe.toJSON())
    .then((savedAndFormattedRecipe) => {
      response.json(savedAndFormattedRecipe)
    })
    .catch((error) => next(error))
})

recipesRouter.delete('/:id', (request, response, next) => {
  Recipe.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

module.exports = recipesRouter