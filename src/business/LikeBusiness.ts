import { LikesDatabase } from "../database/LikesDatabase";
import { RecipeDatabase } from "../database/RecipesDatabase";
import { Like } from "../models/Likes";
import { Recipe } from "../models/Recipe";
import { Authenticator } from "../services/Authenticator";

export class LikeBusiness {
    constructor(
        protected likeDatabase: LikesDatabase,
        protected authenticator: Authenticator,
        protected recipeDatabase: RecipeDatabase,
    ) { }

    public setLike = async (input: any) => {
        const token = input.token
        const recipeId = input.recipeId

        if (!token) {
            throw new Error("Token faltando")
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido")
        }

        const userId = payload.id

        if (!recipeId) {
            throw new Error("Id da receita faltando")
        }

        const isLiked = await this.likeDatabase.findByUserAndRecipeId(userId, recipeId)

        console.log(isLiked);


        if (isLiked) {
            await this.likeDatabase.deletLike(userId, recipeId)
            const recipeDB = await this.recipeDatabase.findById(recipeId)
            const recipe = new Recipe(
                recipeDB.id,
                recipeDB.userId,
                recipeDB.title,
                recipeDB.likes,
                recipeDB.description,
                recipeDB.imageURL,
                recipeDB.ingredients,
                recipeDB.preparation
                )

            recipe.removeLike()
            await this.recipeDatabase.editRecipe(recipe)
        } else {
            const like = new Like(userId, recipeId)
            await this.likeDatabase.setLike(like)

            const recipeDB = await this.recipeDatabase.findById(recipeId)
            const recipe = new Recipe(
                recipeDB.id,
                recipeDB.userId,
                recipeDB.title,
                recipeDB.likes,
                recipeDB.description,
                recipeDB.imageURL,
                recipeDB.ingredients,
                recipeDB.preparation
                )

            recipe.addLike()
            await this.recipeDatabase.editRecipe(recipe)
        }

        const response: object = {
            message: "Feito",
        }

        return response
    }

    public getLikes = async (token: string) => {
        if (!token) {
            throw new Error("Token faltando")
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido")
        }

        const userId = payload.id

        const results = await this.likeDatabase.findByUserId(userId)

        const recipes = results.map(async (result) => {
            const data = await this.recipeDatabase.findById(result.userId)
            return data
        })

        console.log(recipes);
        

        return recipes
    }


}