
import { Recipe } from "../Models/recipe";
import { Ingredient } from "../Models/ingredient";

export class RecipeService {
    private recipes: Recipe[] = [];

    addRecipe(title: String, description: String, difficulty: String, ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
        console.log("recipe Added")
        console.log(this.recipes);
    }

    getRecipe() {
        return this.recipes.slice();
    }

    updateRecipe(index: number, title: String, description: String, difficulty: String, ingredients: Ingredient[]) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients)
    }

    removeRecipe(index: number){
        this.recipes.splice(index,1);
    }

}