import { Component, Input, Output, EventEmitter } from '@angular/core';
import { category, categoryRaw } from "../../api/categories-api.service";

@Component({
    selector: 'app-categorie',
    templateUrl: './categorie.component.html',
    styleUrls: ['./categorie.component.css']
})
export class CategorieComponent  {
    constructor() { }

    @Input() category: categoryRaw;
    @Input() allCategories: categoryRaw[];
    @Input() mode: string;
    @Output() onCategorySelected = new EventEmitter();

    public editCategoryNameMode = false;
    public desplegado = false;

  

    getIcon() {
        if (this.category.icon == 'mdi:circle-small') {
            return 'mdi:image-plus'
        } else {
            return this.category.icon
        }
    }

    seleccionarCategoria(category?: category) {
        if (!!!category) {
            if( this.mode == 'report' ){
                this.onCategorySelected.next(this.category)                
            } else {
                if (!!!this.getSubCategories().length) {
                    this.onCategorySelected.next(this.category)                    
                }
            }
        } else {
            this.onCategorySelected.next(category)
        }
    }

    getSubCategories(){
        return this.allCategories.filter((category:any) => category.parent_id == this.category.id)
    }

}