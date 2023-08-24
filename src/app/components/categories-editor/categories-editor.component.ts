import { Component, EventEmitter,  Output } from '@angular/core';
import { CategoriesApiService, category, categoryRaw } from "../../api/categories-api.service";
import { StateService } from "../../services/state.service";

@Component({
    selector: 'app-categories-editor',
    templateUrl: './categories-editor.component.html',
    styleUrls: ['./categories-editor.component.css']
})
export class CategoriesEditorComponent {

    @Output() onCategorySelected = new EventEmitter();
    @Output() onCategoryDeleted = new EventEmitter();

    public nuevaCategoriaMode = false;

    private icon = 'mdi:circle-small';

    constructor(
        private categoriesApi: CategoriesApiService,
        public state:StateService
    ) { }

   

    agregarNuevaCategoria(nombre: string) {
        this.categoriesApi.addCategory({
            icon: this.icon,
            position: 1,
            name: nombre,
            pcrc: this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString()
        }).subscribe(newCategory => {
            this.state.addCategory(newCategory )
            this.nuevaCategoriaMode = false
            this.seleccionarCategoria(newCategory)
        })
    }

    categoryDeleted(categoryId: string) {
        this.onCategoryDeleted.next(categoryId)
    }

    seleccionarCategoria(category:category) {
        this.onCategorySelected.next(category)
    }

    getFirstCategories(categories:categoryRaw[]){
        return categories.filter(category => !!!category.parent_id)
    }

}