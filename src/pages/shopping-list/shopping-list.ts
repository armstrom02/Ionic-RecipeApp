import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from "@angular/forms/src/forms";
import { ShoppingListService } from "../../Services/shopping-list";
import { Ingredient } from "../../Models/ingredient";



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private slService: ShoppingListService) {
  }

  ionViewWillEnter() {
    this.listItems = this.slService.getItem();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

 

  onCheckItem(index: number){
    this.slService.removeItem(index);
    this.loadItems();

  }

  private loadItems() {
    this.listItems = this.slService.getItem();
  }
}

  


