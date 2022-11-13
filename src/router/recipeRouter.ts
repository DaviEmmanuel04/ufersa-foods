import { Router } from 'express'
import { LikeBusiness } from '../business/LikeBusiness'
import { RecipeBusiness } from '../business/RecipeBusiness'
import { UserBusiness } from '../business/UserBusiness'
import { LikeController } from '../controller/LikeController'
import { RecipeController } from '../controller/RecipeController'
import { UserController } from '../controller/UserController'
import { LikesDatabase } from '../database/LikesDatabase'
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

const likeController = new LikeController( new LikeBusiness(
    new LikesDatabase(),
    new Authenticator,
    new RecipeDatabase
))

recipeRouter.post("/signup", recipeController.signup)
recipeRouter.get("/", recipeController.getRecipes)
recipeRouter.get("/:id", recipeController.getRecipe)
recipeRouter.delete("/:id", recipeController.deleteRecipe)
recipeRouter.put("/:id", recipeController.editRecipe)
recipeRouter.post("/like/:recipeId", likeController.setLike)