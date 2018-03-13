
import { Recipe } from "../Models/recipe";
import { Ingredient } from "../Models/ingredient";
import { EditRecipePageModule } from "../pages/edit-recipe/edit-recipe.module";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [];

    constructor(private authService: AuthService,private http: Http) { }

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

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    storeRecipes(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic-recipebook-95979.firebaseio.com/' + userId + '/recipes.json?auth=' + token,
            this.recipes)
            .map((response: Response) => {
                return response.json();
            });
    }

    fetchRecipes(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic-recipebook-95979.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json() ? response.json() : [];
                for (let item of recipes){
                    if(!item.hasOwnProperty('ingredients')){
                        item.ingredients = [];
                    }
                } 
                return recipes;
            })
            .do((recipes: Recipe[]) => {
                if(recipes){
                    this.recipes = recipes;
                }else{
                    this.recipes = [];
                }
                
                
            });
    }

}