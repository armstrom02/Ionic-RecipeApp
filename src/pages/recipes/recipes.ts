import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { RecipeService } from '../../Services/recipes';
import { Recipe } from '../../Models/recipe';
import { RecipePage } from '../recipe/recipe';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipeService: RecipeService) {
  }

  recipes: Recipe[];

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipe();
  }

  onLoadRecipe(recipe:Recipe,index:number) {
   console.log(recipe.ingredients)
  this.navCtrl.push(RecipePage,{recipe:recipe,index:index})
  }

}
