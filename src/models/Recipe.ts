export interface IRecipeDB {
    id: string,
    title: string,
    description: string,
    imageURL: string,
    ingredients: string,
    preparation: string,
}

export class Recipe {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private imageURL: string,
        private ingredients: string,
        private preparation: string,
    ) { }

    public getId = () => {
        return this.id
    }

    public getTitle = () => {
        return this.title
    }

    public getDescription = () => {
        return this.description
    }

    public getImageURL = () => {
        return this.imageURL
    }

    public getIngredients = () => {
        return this.ingredients
    }

    public getPreparation = () => {
        return this.preparation
    }

    public setTitle = (newTitle: string) => {
        this.title = newTitle
    }

    public setDescription = (newDescription: string) => {
        this.description = newDescription
    }

    public setImageURL = (newImageURL: string) => {
        this.imageURL = newImageURL
    }

    public setIngredients = (newIngredients: string) => {
        this.ingredients = newIngredients
    }

    public setPreparation = (newPreparation: string) => {
        this.preparation = newPreparation
    }
}

export interface ISignupInputDTO {
    title: string,
    description: string,
    imageURL: string,
    ingredients: string,
    preparation: string,
}

export interface ISignupOutputDTO {
    message: string,
}

export interface IGetRecipesInputDTO {
    token: string | undefined,
    search: string,
    order: string,
    sort: string,
    limit: string,
    page: string,
}

export interface IGetRecipesInputDBDTO {
    search: string,
    order: string,
    sort: string,
    limit: number,
    offset: number,
}