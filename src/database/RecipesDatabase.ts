import { IGetRecipesInputDBDTO, IRecipeDB, Recipe } from "../models/Recipe"
import { BaseDatabase } from "./BaseDatabase"

export class RecipeDatabase extends BaseDatabase {
    public static TABLE_RECIPES = "Recipes"

    public createRecipe = async (recipe: Recipe) => {
        const recipeDB: IRecipeDB = {
            id: recipe.getId(),
            userId: recipe.getUserId(),
            title: recipe.getTitle(),
            likes: recipe.getLikes(),
            description: recipe.getDescription(),
            imageURL: recipe.getImageURL(),
            ingredients: recipe.getIngredients(),
            preparation: recipe.getPreparation(),
        }

        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .insert(recipeDB)
    }

    public getRecipes = async (input: IGetRecipesInputDBDTO) => {
        const search = input.search
        const order = input.order
        const sort = input.sort
        const limit = input.limit
        const offset = input.offset

        const recipesDB: IRecipeDB[] = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select()
            .where("title", "LIKE", `%${search}%`)
            .limit(limit)
            .offset(offset)
        
        return recipesDB
    }

    public findById = async (id: string) => {
        const recipesDB: IRecipeDB[] = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select()
            .where({ id })
        
        return recipesDB[0]
    }

    public findByUserId = async (userId: string) => {
        const recipesDB: IRecipeDB[] = await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .select()
            .where({'userId': userId })
        
        return recipesDB
    }

    public deleteRecipe = async (id: string) => {
        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .delete()
            .where({ id })
    }

    public editRecipe = async (recipe: Recipe) => {
        const recipeDB: IRecipeDB = {
            id: recipe.getId(),
            userId: recipe.getUserId(),
            title: recipe.getTitle(),
            likes: recipe.getLikes(),
            description: recipe.getDescription(),
            imageURL: recipe.getImageURL(),
            ingredients: recipe.getIngredients(),
            preparation: recipe.getPreparation(),
        }
        
        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .update(recipeDB)
            .where({ id: recipeDB.id })
    }
}