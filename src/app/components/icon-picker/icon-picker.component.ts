import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import icons from '../../../assets/materialDesignIcons.json';
import { PagerComponent } from "../pager/pager.component";

type icon = {
    "name": string;
    "aliases": {
        "name": string;
    }[];
    "tags": {
        "name": string;
    }[];
}
@Component({
    selector: 'app-icon-picker',
    templateUrl: './icon-picker.component.html',
    styleUrls: ['./icon-picker.component.css']
})
export class IconPickerComponent implements OnInit {

    constructor() { }

    @ViewChild('pager',{ static: false }) pager:PagerComponent
    @Output() onIconSelected = new EventEmitter();


    public pageSize = 30;
    public categorySelected = 'todas';
    public categories: string[];
    public allIconsCount = 0;
    public icons: icon[];
    public selectedIcon:icon = null;

    public ngOnInit() {

        let tags = icons.icons.map(icon => icon.tags).reduce((prev, current) => {
            return [...prev, ...current]
        }, []);

        let distinctTags = this.distinct('name')(tags);

        this.categories = distinctTags;
        
        this.icons = this.getIconsPage(this.categories[0], 1);

        this.allIconsCount = icons.icons.length;
    }

    private distinct(key) {
        return (data) => {
            var newArray = []

            for (var i = 0; i < data.length; i++) {
                if (!newArray.includes(data[i][key])) {
                    newArray.push(data[i][key])
                }
            }
            return newArray
        }
    }

    public onSelectedCategory(category: string) {
        this.categorySelected = category;        
        this.changeIconsPage(1);
    }

    getAllIconsPerCategory(category: string) {
        return icons.icons.
            filter(icon => {
                let incluyeCategoria = false;
                if (category != 'todas') {
                    incluyeCategoria = icon.tags.some(tag => tag.name == category )
                } else {
                    incluyeCategoria = true;
                }
                return  incluyeCategoria
            })
    }

    private getIconsPage(category: string, page: number) {
        let allIcons = this.getAllIconsPerCategory(category);
        this.allIconsCount = allIcons.length;
        return allIcons.slice(this.pageSize * (page - 1), this.pageSize * page)
    }

    public changeIconsPage(page) {        
        this.icons = this.getIconsPage(this.categorySelected, page)
    }

    selectIcon(icon:icon){
        this.selectedIcon = icon;
        this.onIconSelected.next('mdi:' + this.selectedIcon.name)
    }
}
