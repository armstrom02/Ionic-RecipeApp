import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms/src/forms";
import { ShoppingListService } from "../../Services/shopping-list";
import { Ingredient } from "../../Models/ingredient";
import { SlOptionsPage } from './sl-options/sl-options';
import { AuthService } from '../../Services/auth';



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.listItems = this.slService.getItem();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }


  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();

  }

  private loadItems() {
    this.listItems = this.slService.getItem();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait ...'
    })
    const popover = this.popoverCtrl.create(SlOptionsPage)
    popover.present({ ev: event });
    popover.onDidDismiss(data => {

      if (data.action == 'load') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.slService.fetchList(token)
                .subscribe(
                  (list: Ingredient[]) => {
                    loading.dismiss();
                    if (list) {
                      this.listItems = list;
                    } else {
                      this.listItems = [];
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
              this.slService.storeList(token).subscribe(
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
