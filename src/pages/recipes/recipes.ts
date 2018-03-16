import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { RecipeService } from '../../Services/recipes';
import { Recipe } from '../../Models/recipe';
import { RecipePage } from '../recipe/recipe';
import { SlOptionsPage } from '../database-options/sl-options';
import { AuthService } from '../../Services/auth';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private recipeService: RecipeService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
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

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait ...'
    })
    const popover = this.popoverCtrl.create(SlOptionsPage)
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if(!data){
        return;
      }
      if (data.action == 'load') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.recipeService.fetchRecipes(token)
                .subscribe(
                  (recipes: Recipe[]) => {
                    loading.dismiss();
                    if (recipes) {
                      this.recipes = recipes;
                    } else {
                      this.recipes = [];
                    }

                  },
                  error => {
                    loading.dismiss();
                    this.handleError(error.message);
                  }
                );
            });

      } else if (data.action == 'store') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.recipeService.storeRecipes(token).subscribe(
                () => loading.dismiss(),
                error => {
                  loading.dismiss();
                  this.handleError(error.message);
                }
              )
            });
      }
    });
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured !',
      message: errorMessage,
      buttons: ['ok']
    });
    alert.present();
  }
}
