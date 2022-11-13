import { BaseDatabase } from "../BaseDatabase"
import { LikesDatabase } from "../LikesDatabase"
import { RecipeDatabase } from "../RecipesDatabase"
import { UserDatabase } from "../UserDatabase"
import { recipes, users } from "./data"

class Migrations extends BaseDatabase {
    execute = async () => {
        try {
            console.log("Creating tables...")
            await this.createTables()
            console.log("Tables created successfully.")

            console.log("Populating tables...")
            await this.insertData()
            console.log("Tables populated successfully.")

            console.log("Migrations completed.")
        } catch (error: any) {
            console.log("Error in migrations...")
            console.log(error.message)
        } finally {
            console.log("Ending connection...")
            BaseDatabase.connection.destroy()
            console.log("Connection closed graciously.")
        }
    }

    createTables = async () => {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${RecipeDatabase.TABLE_RECIPES};
        DROP TABLE IF EXISTS ${UserDatabase.TABLE_USERS};
        
        CREATE TABLE IF NOT EXISTS ${UserDatabase.TABLE_USERS}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL" NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS ${RecipeDatabase.TABLE_RECIPES}(
            id VARCHAR(255) PRIMARY KEY,
            userId VARCHAR(255), 
            title VARCHAR(255) NOT NULL,
            likes INT,
            description VARCHAR(255) NOT NULL,
            imageURL VARCHAR(255) NOT NULL,
            ingredients VARCHAR(255) NOT NULL,
            preparation TEXT NOT NULL,
            FOREIGN KEY (userId) REFERENCES ${UserDatabase.TABLE_USERS}(id)
        );

        CREATE TABLE IF NOT EXISTS ${LikesDatabase.TABLE_LIKES}(
            userId VARCHAR(255), 
            recipeId VARCHAR(255), 
            FOREIGN KEY (userId) REFERENCES ${UserDatabase.TABLE_USERS}(id),
            FOREIGN KEY (recipeId) REFERENCES ${RecipeDatabase.TABLE_RECIPES}(id)
        );
        `)
    }

    insertData = async () => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(users)
        await BaseDatabase
            .connection(RecipeDatabase.TABLE_RECIPES)
            .insert(recipes)
    }
}

const migrations = new Migrations()
migrations.execute()