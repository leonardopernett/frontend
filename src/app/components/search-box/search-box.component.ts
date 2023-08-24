import {  Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Input} from '@angular/core';
import { PcrcApiService } from "../../api/pcrc-api.service";
import { StateService } from 'src/app/services/state.service';
import { EventsService } from 'src/app/services/events.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { VoiceService } from 'src/app/services/voice.service';


@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit,AfterViewInit{
    @ViewChild('buscar',{static:false}) buscar:ElementRef
    @ViewChild('enter',{static:false}) inputElement: ElementRef;

    texto=""
    lista=[]
    mostrar=false
    textBusuqeda:string = ""
    sVisible:boolean = false

    constructor(
        public PcrcApiService: PcrcApiService,
        public state:StateService,
        public events: EventsService,
        public voiceService:VoiceService
        
    ) { }

    ngOnInit() {

        this.voiceService.init()

     }

    ngAfterViewInit(){

        const input$ = fromEvent(this.buscar.nativeElement,'keyup');

        input$.pipe(
            debounceTime(400),
            pluck('target','value'),
            distinctUntilChanged()
        ).subscribe(data=>{
            this.busqueda(data)
        })
    
    }

        Teclado(event:any){
            if (event.keyCode == 13){
                this.events.newSearch(this.texto)
                this.mostrar=false
                this.texto=""
                this.voiceService.stop()
            }    
        }
         

        busqueda(texto){
            this.mostrar = true
            let pcrc = this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString()
                if(!texto){
                    this.mostrar=false
                    return
                } 

            this.PcrcApiService.getSuggestions(pcrc,texto).subscribe(
                data=>{
                    this.lista=data
                    
                }
            )

        }

        buscarArticulos(data){
            
            this.events.newSearch(data)
            this.mostrar=false
            this.texto=""
            this.lista=[]
            this.textBusuqeda= ""
            this.buscar.nativeElement.value=""
            
        }


        recognitionStart(){
            
            this.voiceService.start()
            this.buscar.nativeElement.focus();

            
        }

        recognitionStop() {
            
            this.voiceService.stop();
            this.buscar.nativeElement.focus();
            this.voiceService.text=""

          }
      
}
