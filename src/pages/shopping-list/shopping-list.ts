import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
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
    private authService: AuthService) {
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
    const popover = this.popoverCtrl.create(SlOptionsPage)
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (data.action == 'load') {
        console.log('load');
        this.authService.getActiveUser().getToken()
        .then(
          (token: string) => {
              this.slService.fetchList(token)
              .subscribe(
                (list: Ingredient[]) =>{
                  if(list){
                    this.listItems = list;
                  }else {
                    this.listItems=[];
                  }
                  
                },
                error => {
                  console.log(error);
                }
              );
          });

      } else {
        this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
                this.slService.storeList(token).subscribe(
                  ()=> console.log ('Success!'),
                  error => {
                    console.log(error);
                  }
                )
            });
      }
    });
  }
}
