const express = require("express");
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.static('build'))

let recipes = [
  {
    id: 1,
    title: "Apple Breakfast Lasagna",
    ingredients: [
      "1C sour cream ",
      "2C shredded two-cheese cheddar blend",
      "1/3 C packed brown sugar ",
      "12 frozen French toast slices ",
      "1 (20 oz) can apple pie filling",
      "1/2 lb sliced boiled ham ",
      "1C granola with raisins",
    ],
    description:
      "In a small bowl, blend sour cream and brown sugar, chill. Place 6 French toast slices in bottom of greased 9x13 pan. Layer ham, 1 1/2 C cheese and remaining 6 slices of French toast. Spread apple pie filling over top; sprinkle with granola. Bake at 350 for 25 minutes. Top with remaining 1/2C cheese and bake 5 minutes or until cheese is melted. Serve with sour cream mixture. Serves 6.",
    type: "Breakfast",
  },
  {
    id: 2,
    title: "Cinnamon Syrup",
    ingredients: [
      "1 C light con syrup",
      "2 C sugar",
      "1/2 C water",
      "2 tsp cinnamon",
      "1 C evaporated milk",
    ],
    description:
      "Put first four ingredients in pan and bring to a boil over medium heat. Once boiling, stir for 2 minutes. Remove from heat. Cool for 5 minutes. Pour in evaporated milk after the 5 minutes.",
    type: "Breakfast",
  },
  {
    id: 3,
    title: "German Pancakes",
    ingredients: [
      "1 C flour",
      "1/2 tsp salt",
      "1 C milk",
      "6 eggs",
      "5 tbsp butter",
    ],
    description:
      "Melt butter in 9x13 pan in oven. Mix flour, salt and milk together until smooth. Add eggs. Pour batter into melted butter. Bake at 350 for 20 minutes.",
    type: "Breakfast",
  },
  {
    id: 4,
    title: "Bacon-cheese Pull-aparts",
    ingredients: [
      "1 egg 1 (2.1 oz) pkg precooked bacon, cut into 1/2 inch pieces",
      "2 tbsp milk ",
      "1 16.3 oz can Pillsbury Grands! Flaky 3 oz (3/4 cup(s)) shredded cheddar layers refrigerated original biscuits ",
      "1/4 cup(s) finely chopped green onions",
    ],
    description:
      "Heat oven to 350. Spray 11x7 or 12x8 glass baking dish with cooking spray. In large bowl, beat egg and milk with wire whisk until smooth. Separate dough into 8 biscuits; but each into quarters. Gently stir biscuit pieces into egg mixture to coated evenly. Fold in bacon, cheese and onions. Spoon mixture into sprayed dish; arrange biscuit pieces in a single layer. Bake at 350 for 23 to 28 minutes or until golden brown. Cut into squares. Serves 8.",
    type: "Breakfast",
  },
  {
    id: 5,
    title: "Breakfast Bars",
    ingredients: [
      "1 cup(s) light KARO syrup ",
      "1 cup(s) peanut butter",
      "1 cup(s) sugar ",
      "6 cup(s) cereal (Special K or Rice Krispies)",
    ],
    description:
      "Pour Karo and sugar in heavy saucepan and bring to a boil. Remove from heat and add peanut butter and cereal. Spread onto a greased sheet and cool. Cut into bars.",
    type: "Breakfast",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Recipe Book</h1>");
});

app.get("/api/recipes", (req, res) => {
  res.send(recipes);
});

app.get("/api/recipes/:id", (req, res) => {
  const id = Number(req.params.id);
  const recipe = recipes.find((r) => r.id === id);
  res.json(recipe);
});

const generateId = () => {
  const maxId = recipes.length > 0 
    ? Math.max(...recipes.map((r) => r.id)) 
    : 0
  return maxId + 1
};

app.post("/api/recipes", (req, res) => {
  const body = req.body;
  if (!body.title) {
    return res.status(400).json({
      error: "Recipe must have a title",
    });
  }

  const recipe = {
    id: body.id || generateId(),
    title: body.title,
    ingredients: body.ingredients,
    description: body.description,
    type: body.type
  };

  recipes = recipes.concat(recipe);
  
  res.json(recipe);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
