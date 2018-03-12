import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../Models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../Services/shopping-list';
import { RecipeService } from '../../Services/recipes';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe
  index: number
  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesService: RecipeService, private slService: ShoppingListService) {
  }


  ngOnInit() {
    this.recipe = this.navParams.get("recipe");
    this.index = this.navParams.get("index");
    console.log(this.recipe);
  }

  onAddIngredients() {
    this.slService.addItems(this.recipe.ingredients);

  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index });
  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();

  }

}
