import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-pager',
	templateUrl: './pager.component.html',
	styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit, OnChanges {

	constructor() { }

	@Input() numberOfItems:number;
	@Input() pageSize:number;

	@Output() onPageSelected = new EventEmitter();

	pages: number[] = [];
	pagesActive: number[] = [];
	selectedPage: number = 1;
	
	public reset(items, pageSize){
		this.pages.length = 0;
		this.pagesActive.length = 0;
		this.selectedPage = 1;
		for (let iterator = { pageNumber: 1, pagePoint: 0 }; iterator.pagePoint < this.numberOfItems; iterator.pagePoint += this.pageSize) {
			this.pages.push(iterator.pageNumber);
			iterator.pageNumber++;
		}
		this.pagesActive = this.pages.slice(0, 5);
	}

	ngOnChanges(changes: SimpleChanges){
		if(changes.numberOfItems){
			this.reset(changes.numberOfItems.currentValue, this.pageSize)
		}
	}

	ngOnInit() {
	}

	selectPage(pageNumber: number) {

		if (this.pages[this.pages.length - 1] >= 5) {

			let minBound = (pageNumber - 2) - 1;
			let maxBound = (pageNumber + 2);
			if (minBound < 0) {
				maxBound = 5;
				minBound = 0;
			}

			if (maxBound > this.pages.length) {
				maxBound = this.pages.length
				minBound = this.pages.length - 5;
			}

			this.pagesActive = this.pages.slice(minBound, maxBound);

		}

		this.selectedPage = pageNumber;
		this.onPageSelected.next(pageNumber);
	}

}