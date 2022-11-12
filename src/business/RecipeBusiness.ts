import { RecipeDatabase } from "../database/RecipesDatabase"
import { IGetRecipesInputDBDTO, IGetRecipesInputDTO, ISignupInputDTO, ISignupOutputDTO, Recipe } from "../models/Recipe"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class RecipeBusiness {
    constructor(
        protected recipeDatabase: RecipeDatabase,
        protected authenticator: Authenticator,
        protected idGenerator: IdGenerator,
    ) {}

    public signup = async (input: ISignupInputDTO) => {
        const title = input.title
        const description = input.description
        const imageURL = input.imageURL
        const ingredients = input.ingredients
        const preparation = input.preparation

        if (!title || !description || !imageURL || !ingredients || !preparation) {
            throw new Error("Um ou mais parâmetros faltando")
        }

        if (typeof title !== "string" || title.length < 3) {
            throw new Error("Parâmetro 'Título' inválido")
        }

        if (typeof description !== "string" || description.length < 3) {
            throw new Error("Parâmetro 'Descrição' inválido")
        }

        if (typeof imageURL !== "string" || imageURL.length < 3) {
            throw new Error("Parâmetro 'Imagem' inválido")
        }

        const id = this.idGenerator.generate()

        const recipe = new Recipe(
            id,
            title,
            description,
            imageURL,
            ingredients,
            preparation,
        )

        await this.recipeDatabase.createRecipe(recipe)

        const response: ISignupOutputDTO = {
            message: "Receita cadastrada com sucesso",
        }

        return response
    }

    public getRecipes = async (input: IGetRecipesInputDTO) => {
        const token = input.token
        const search = input.search || ""
        const order = input.order || "name"
        const sort = input.sort || "ASC"
        const limit = Number(input.limit) || 10
        const page = Number(input.page) || 1

        const offset = limit * (page - 1)

        if (!token) {
            throw new Error("Token faltando")
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido")
        }

        const getRecipesInputDB: IGetRecipesInputDBDTO = {
            search,
            order,
            sort,
            limit,
            offset
        }

        const recipesDB = await this.recipeDatabase.getRecipes(getRecipesInputDB)

        const recipes = recipesDB.map(recipeDB => {
            const recipe = new Recipe(
                recipeDB.id,
                recipeDB.title,
                recipeDB.description,
                recipeDB.imageURL,
                recipeDB.ingredients,
                recipeDB.preparation,
            )

            const recipesResponse: any = {
                id: recipe.getId(),
                title: recipe.getTitle(),
                description: recipe.getDescription(),
                ingredients: recipe.getIngredients(),
                preparation: recipe.getPreparation(),
            }

            return recipesResponse
        })

        const response: any = {
            recipes
        }

        return response
    }

    public deleteRecipe = async (input: any) => {
        const idToDelete = input.idToDelete

        const userDB = await this.recipeDatabase.findById(idToDelete)

        if (!userDB) {
            throw new Error("Receita a ser deletado não encontrada")
        }

        await this.recipeDatabase.deleteRecipe(idToDelete)

        const response = {
            message: "Receita deletada com sucesso"
        }

        return response
    }

    public editRecipe = async (input: any) => {
        const {
            token,
            idToEdit,
            title,
            description,
            imageURL,
            ingredients,
            preparation
        } = input

        if (!token) {
            throw new Error("Token faltando")
        }

        if (!title && !description && !imageURL && !ingredients && !preparation) {
            throw new Error("Parâmetros faltando")
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error("Token inválido")
        }

        if (title && typeof title !== "string") {
            throw new Error("Parâmetro 'title' inválido")
        }

        if (title && title.length > 3) {
            throw new Error("Parâmetro 'title' inválido")
        }

        if (description && typeof description !== "string") {
            throw new Error("Parâmetro 'description' inválido")
        }

        if (description && description.length < 3) {
            throw new Error("Parâmetro 'description' inválido")
        }

        if (imageURL && typeof imageURL !== "string") {
            throw new Error("Parâmetro 'imageURL' inválido")
        }

        if (imageURL && imageURL.length < 3) {
            throw new Error("Parâmetro 'imageURL' inválido")
        }

        if (ingredients && typeof ingredients !== "string") {
            throw new Error("Parâmetro 'ingredients' inválido")
        }

        if (ingredients && ingredients.length < 3) {
            throw new Error("Parâmetro 'ingredients' inválido")
        }

        if (preparation && typeof preparation !== "string") {
            throw new Error("Parâmetro 'preparation' inválido")
        }

        if (preparation && preparation.length < 3) {
            throw new Error("Parâmetro 'preparation' inválido")
        }

        const recipeDB = await this.recipeDatabase.findById(idToEdit)

        if (!recipeDB) {
            throw new Error("Receita a ser editada não existe")
        }

        const recipe = new Recipe(
            recipeDB.id,
            recipeDB.title,
            recipeDB.description,
            recipeDB.imageURL,
            recipeDB.ingredients,
            recipeDB.preparation
        )

        title && recipe.setTitle(title)
        description && recipe.setDescription(description)
        imageURL && recipe.setImageURL(imageURL)
        ingredients && recipe.setIngredients(ingredients)
        preparation && recipe.setPreparation(preparation)

        await this.recipeDatabase.editRecipe(recipe)

        const response = {
            message: "Edição realizada com sucesso"
        }

        return response
    }
}