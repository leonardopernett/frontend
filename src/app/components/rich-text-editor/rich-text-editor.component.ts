import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { ImageDrop } from 'quill-image-drop-module';
import * as QuillBetterTable  from 'quill-better-table'

var Font = Quill.import('formats/font');
Font.whitelist = ['roboto', 'lato', 'raleway', 'montserrat', 'opensans','CIBFontSans'];
Quill.register(Font, true);
Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register('modules/imageDrop', ImageDrop);
Quill.register({'modules/better-table': QuillBetterTable }, true);

@Component({
	selector: 'app-rich-text-editor',
	templateUrl: './rich-text-editor.component.html',
	styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent implements OnInit, AfterViewInit {

	@Output() contentChange = new EventEmitter();
    @ViewChild('RTE', { static: false }) RTE: ElementRef;

	constructor() { }

	editor: any;

	ngOnInit() { }

	ngAfterViewInit() {
		this.editor = new Quill(this.RTE.nativeElement, this.options);
		// Add fonts to whitelist
	}

	changedEditor({ content, text }) {
		this.contentChange.next({ content: content, text: text })
	}

	setContent(content) {
		this.editor.setContents(content)
	}
	
	setHtmlContent(htmlString){
		this.editor.clipboard.dangerouslyPasteHTML(htmlString)
	}

	getContent():string{
		return JSON.stringify(this.editor.getContents())
	}
	
	getText():string{
		return this.editor.getText()		
	}

	content = [];

	colors = [	

		'#ffcdd2',
		'#F8BBD0',
		'#E1BEE7',
		'#D1C4E9',
		'#C5CAE9',
		'#BBDEFB',
		'#B3E5FC',

		'#ef9a9a',
		'#F48FB1',
		'#CE93D8',
		'#B39DDB',
		'#9FA8DA',
		'#90CAF9',
		'#81D4FA',

		'#e57373',
		'#F06292',
		'#BA68C8',
		'#9575CD',
		'#7986CB',
		'#64B5F6',
		'#4FC3F7',

		'#ef5350',
		'#EC407A',
		'#AB47BC',
		'#7E57C2',
		'#5C6BC0',
		'#42A5F5',
		'#29B6F6',

		'#f44336',
		'#E91E63',
		'#9C27B0',
		'#673AB7',
		'#3F51B5',
		'#2196F3',
		'#03A9F4',

		'#e53935',
		'#D81B60',
		'#8E24AA',
		'#5E35B1',
		'#3949AB',
		'#1E88E5',
		'#039BE5',

		'#d32f2f',
		'#C2185B',
		'#7B1FA2',
		'#512DA8',
		'#303F9F',
		'#1976D2',
		'#0288D1',

		'#c62828',
		'#AD1457',
		'#6A1B9A',
		'#4527A0',
		'#283593',
		'#1565C0',
		'#0277BD',

		'#b71c1c',
		'#880E4F',
		'#4A148C',
		'#311B92',
		'#1A237E',
		'#0D47A1',
		'#01579B',

		'#B2EBF2',
		'#B2DFDB',
		'#C8E6C9',
		'#DCEDC8',
		'#F0F4C3',
		'#FFF9C4',
		'#FFECB3',

		'#80DEEA',
		'#80CBC4',
		'#A5D6A7',
		'#C5E1A5',
		'#E6EE9C',
		'#FFF59D',
		'#FFE082',

		'#4DD0E1',
		'#4DB6AC',
		'#81C784',
		'#AED581',
		'#DCE775',
		'#FFF176',
		'#FFD54F',

		'#26C6DA',
		'#26A69A',
		'#66BB6A',
		'#9CCC65',
		'#D4E157',
		'#FFEE58',
		'#FFCA28',

		'#00BCD4',
		'#009688',
		'#4CAF50',
		'#8BC34A',
		'#CDDC39',
		'#FFEB3B',
		'#FFC107',

		'#00ACC1',
		'#00897B',
		'#43A047',
		'#7CB342',
		'#C0CA33',
		'#FDD835',
		'#FFB300',

		'#0097A7',
		'#00796B',
		'#388E3C',
		'#689F38',
		'#AFB42B',
		'#FBC02D',
		'#FFA000',

		'#00838F',
		'#00695C',
		'#2E7D32',
		'#558B2F',
		'#9E9D24',
		'#F9A825',
		'#FF8F00',

		'#006064',
		'#004D40',
		'#1B5E20',
		'#33691E',
		'#827717',
		'#F57F17',
		'#FF6F00',

		'#FFE0B2',
		'#FFCCBC',
		'#D7CCC8',
		'#F5F5F5',
		'#CFD8DC',
		'#808080',
		'#000000',

		'#FFCC80',
		'#FFAB91',
		'#BCAAA4',
		'#EEEEEE',
		'#B0BEC5',
		'#FF0000',
		'#800000',

		'#FFB74D',
		'#FF8A65',
		'#A1887F',
		'#E0E0E0',
		'#90A4AE',
		'#FFFF00',
		'#808000',

		'#FFA726',
		'#FF7043',
		'#8D6E63',
		'#BDBDBD',
		'#78909C',
		'#00FF00',
		'#008000',

		'#FF9800',
		'#FF5722',
		'#795548',
		'#9E9E9E',
		'#607D8B',
		'#00FFFF',
		'#008080',

		'#FB8C00',
		'#F4511E',
		'#6D4C41',
		'#757575',
		'#546E7A',
		'#0000FF',
		'#000080',

		'#F57C00',
		'#E64A19',
		'#5D4037',
		'#616161',
		'#455A64',
		'#FF00FF',
		'#800080',

		'#EF6C00',
		'#D84315',
		'#4E342E',
		'#424242',
		'#37474F',
		'#000000',
		'#000000',

		'#E65100',
		'#BF360C',
		'#3E2723',
		'#212121',
		'#263238',
		'#ffffff',
		'#000000',
	];

	modules = {
	   
		toolbar: {
			container: '#RTEtoolbar'
		},
		blotFormatter: {			
			align: {
				aligner: {
					// whether or not the aligner should handle the actual alignment properties
					applyStyle: false
				},	
				// the toolbar so users can change alignments
				toolbar: {
					buttonStyle: {display:'none'}
				}
			}
		},
		imageDrop: true
	}

	options = {
		modules: {
        
				toolbar: {
					container: '#RTEtoolbar'
				},
			/* 
				'better-table': {
					operationMenu: {
					items: {
						unmergeCells: {
						text: 'Another unmerge cells name'
						}
					},
					color: {
						colors: ['green', 'red', 'yellow', 'blue', 'white'],
						text: 'Background Colors:'
					}
					}
				},
 */
				blotFormatter: {			
					align: {
						aligner: {
							// whether or not the aligner should handle the actual alignment properties
							applyStyle: false
						},	
						// the toolbar so users can change alignments
						toolbar: {
							buttonStyle: {display:'none'}
						}
					}
				},
				imageDrop: true,
		},
		placeholder: 'Contenido del articulo ...',
		readOnly: false,
		theme: 'snow',
		bounds: 'app-rich-text-editor',
		
	};

	insertTable(){
		let tableModule = this.editor.getModule('better-table')
		tableModule.insertTable(3, 3)
	}
}