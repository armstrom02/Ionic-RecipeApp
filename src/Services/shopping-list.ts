import { Ingredient } from "../Models/ingredient";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    constructor(private http: Http, private authService: AuthService) {

    }


    addItem(name: String, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients)
    }

    addItems(item: Ingredient[]) {
        this.ingredients.push(...item);
    }

    getItem() {
        return this.ingredients.slice();
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic-recipebook-95979.firebaseio.com/' + userId + '/shopping-list.json?auth='+token,
            this.ingredients)
            .map((response: Response) => {
            return response.json();
        });
    }

    fetchList(token:string){
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic-recipebook-95979.firebaseio.com/' + userId  + '/shopping-list.json?auth='+token)
        .map((response: Response) => {
            return response.json();
        })
        .do((ingredient:Ingredient[])=>{
            if(ingredient){
                this.ingredients = ingredient;
            }else{
                this.ingredients = [];
            }
        });
    }
}