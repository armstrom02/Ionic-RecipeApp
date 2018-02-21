import { Ingredient } from "../Models/ingredient";

export class ShoppingListService {

    private ingredients: Ingredient[] = [];




    addItem(name: String, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients)
    }

    addItems(item: Ingredient[]){
        this.ingredients.push(...item);
    }

    getItem(){
        return this.ingredients.slice();
    }

    removeItem(index: number){
        this.ingredients.splice(index,1);
    }
}