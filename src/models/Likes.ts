export interface ILikeDB {
    userId: string,
    recipeId: string,
}

export class Like {
    constructor(
        private userId: string,
        private  recipeId: string,
    ) { }

    public getUserId = () => {
        return this.userId
    }

    public getRecipeId = () => {
        return this.recipeId
    }
}