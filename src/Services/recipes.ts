
import { Recipe } from "../Models/recipe";
import { Ingredient } from "../Models/ingredient";
import { EditRecipePageModule } from "../pages/edit-recipe/edit-recipe.module";

export class RecipeService {
    private recipes: Recipe[] = [];

    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
        console.log("recipe Added")
    }

    getRecipe() {
        return this.recipes.slice();
    }

    updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients)
        console.log("recipe updated")
    }

    removeRecipe(index: number){
        this.recipes.splice(index,1);
    }

}