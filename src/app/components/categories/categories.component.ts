import { Component, EventEmitter, Input, Output } from '@angular/core';
import { category, categoryRaw } from '../../api/categories-api.service';
import { StateService } from "../../services/state.service";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent  {

    estado

    @Output() onCategorySelected = new EventEmitter();
    @Input() categories: {
        state: "finish" | "loading";
        value?: categoryRaw[];
    };

    @Input() group: string;
    @Input() mode: string;

    public nuevaCategoriaMode = false;

    private icon = 'mdi:circle-small';

    constructor(public state: StateService) { 

        this.estado=this.state.getValueOf("selectedPcrc")

     }



    seleccionarCategoria(category:category) {
        this.onCategorySelected.next(category)
    }

    getFirstCategories(categories:categoryRaw[]){
        return categories.filter(category => !!!category.parent_id)
    }
    
}