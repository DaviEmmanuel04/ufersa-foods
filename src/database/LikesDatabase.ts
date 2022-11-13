import { ILikeDB, Like } from "../models/Likes";
import { BaseDatabase } from "./BaseDatabase";

export class LikesDatabase extends BaseDatabase {
    public static TABLE_LIKES = "Likes"

    public setLike = async (like: Like) => {
        const likeDB: ILikeDB = {
            userId: like.getUserId(),
            recipeId: like.getRecipeId()
        }

        await BaseDatabase
            .connection(LikesDatabase.TABLE_LIKES)
            .insert(likeDB)        
    }

    public findByUserId = async (userId:string) => {
        const results = await BaseDatabase
            .connection(LikesDatabase.TABLE_LIKES)
            .select()
            .where({ userId })
    
        return results
    }

    public findByUserAndRecipeId = async (userId:string, recipeId: string) => {
        const results = await BaseDatabase
            .connection(LikesDatabase.TABLE_LIKES)
            .select()
            .where({ userId })
            .where({ recipeId })
    
        return results[0]
    }

    public deletLike = async (userId: string, recipeId: string) => {
        await BaseDatabase
            .connection(LikesDatabase.TABLE_LIKES)
            .delete()
            .where({ userId })
            .where({ recipeId })
    }
}