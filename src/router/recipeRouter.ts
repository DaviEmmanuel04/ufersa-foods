import { Router } from 'express'
import { RecipeBusiness } from '../business/RecipeBusiness'
import { UserBusiness } from '../business/UserBusiness'
import { RecipeController } from '../controller/RecipeController'
import { UserController } from '../controller/UserController'
import { RecipeDatabase } from '../database/RecipesDatabase'
import { UserDatabase } from '../database/UserDatabase'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'

export const recipeRouter = Router()

const recipeController = new RecipeController(
    new RecipeBusiness(
        new RecipeDatabase(),
        new Authenticator(),
        new IdGenerator()
    )
)

recipeRouter.post("/signup", recipeController.signup)
recipeRouter.get("/", recipeController.getRecipes)
recipeRouter.delete("/:id", recipeController.deleteRecipe)
recipeRouter.put("/:id", recipeController.editRecipe)