import { Request, Response } from "express";
import { LikeBusiness } from "../business/LikeBusiness";

export class LikeController {
    constructor(
        protected likeBusiness: LikeBusiness
    ){}

    public setLike = async (req: Request, res: Response) => {
        try {
            const input: any = {
                token: req.headers.authorization,
                recipeId: req.params.recipeId
            }

            const response = await this.likeBusiness.setLike(input)
            res.status(201).send(response)
        } catch (error) {
            console.log(error)

            if (error instanceof Error) {
                return res.status(400).send({ message: error.message })
            }

            res.status(500).send({ message: "Erro inesperado" })
        }
    }
}