import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { IGetRecipesInputDTO, ISignupInputDTO } from "../models/Recipe";

export class RecipeController {
    constructor(
        protected recipeBusiness: RecipeBusiness
    ) {}

    public signup = async (req: Request, res: Response) => {
        try {
            const input: ISignupInputDTO = {
                token: req.headers.authorization,
                title: req.body.title,
                description: req.body.description,
                imageURL: req.body.imageURL,
                ingredients: req.body.ingredients,
                preparation: req.body.preparation,
            }

            const response = await this.recipeBusiness.signup(input)

            res.status(201).send(response)
        } catch (error) {
            console.log(error)

            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }

    public getRecipes = async (req: Request, res: Response) => {
        try {
            const input: IGetRecipesInputDTO = {
                token: req.headers.authorization,
                search: req.query.search as string,
                order: req.query.order as string,
                sort: req.query.sort as string,
                limit: req.query.limit as string,
                page: req.query.page as string
            }

            const response = await this.recipeBusiness.getRecipes(input)

            res.status(200).send(response)
        } catch (error) {
            console.log(error)
            
            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }

    public getRecipe = async (req: Request, res: Response) => {
        try {
            const recipeId: string = req.params.recipeId

            const response = await this.recipeBusiness.getRecipeById(recipeId)

            res.status(200).send(response)
        } catch (error) {
            console.log(error)
            
            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }

    public deleteRecipe = async (req: Request, res: Response) => {
        try {
            const input: any = {
                token: req.headers.authorization,
                idToDelete: req.params.id
            }

            const response = await this.recipeBusiness.deleteRecipe(input)

            res.status(200).send(response)
        } catch (error) {
            console.log(error)
            
            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }

    public editRecipe = async (req: Request, res: Response) => {
        try {
            const input: any = {
                token: req.headers.authorization,
                idToEdit: req.params.id,
                title: req.body.title,
                description: req.body.description,
                imageURL: req.body.imageURL,
                ingredients: req.body.ingredients,
                preparation: req.body.preparation
            }

            const response = await this.recipeBusiness.editRecipe(input)

            res.status(200).send(response)
        } catch (error) {
            console.log(error)
            
            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }
}