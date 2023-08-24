import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { concatMap, filter, tap, retryWhen, takeUntil, delayWhen, skip, take } from 'rxjs/operators';
import { UserApiService } from 'src/app/api/user-api.service';
import { SocketService } from 'src/app/services/socket.service';
import { TotalService } from 'src/app/services/total.service';
import { ArticlesApiService } from "../../api/articles-api.service";
import { category } from "../../api/categories-api.service";
import { Article } from "../../article";
import { StateService } from "../../services/state.service";

type mode = 'category'|'top'|'update'|'obligatorio'

@Component({
    selector: 'app-explorar',
    templateUrl: './explorar.component.html',
    styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {

    public articles: Article[] = []
    public placeholders: any[] = []
    private categorySelected:category
    public mode:mode = 'update'
    private scrollSubject = new BehaviorSubject(1)
    private scroll$ = this.scrollSubject.asObservable()

    public searchError = false;
    public searchErrorMessage = 5;
    private errorSubject = new BehaviorSubject(true)
    public error$ = this.errorSubject.asObservable().pipe(skip(3),tap(result => {
        this.searchError = false
        this.placeholders = []
    }));
    private errorTimeout;
    total: any;
    
    constructor(
        private state: StateService,
        private articlesApi: ArticlesApiService,
        public socketService:SocketService,
        public userApiService:UserApiService,
        public totalService:TotalService
    ){  }

    ngOnInit() { 

         this.verificartotal() 
       
        var storeCategoria= JSON.parse(localStorage.getItem('categoria'));

        if(storeCategoria!=null){

        this.categoriaSeleccionadaStore(storeCategoria)
       

        localStorage.removeItem('categoria');
        
        }

        this.state.selectedPcrc$.pipe(
            tap(pcrc => this.articles = [])
        ).subscribe()

        this.scroll$.pipe(
            tap(value => this.placeholders = [1,1,1]),
            concatMap(value =>{

                if(this.mode == "category"){
                    return this.articlesApi.getArticlesByCategory(
                        this.categorySelected.id,
                        '1',
                        this.articles.length,
                        6
                    )                    
                }

                

                if(this.mode == 'update'){
                    return this.articlesApi.getArticlesByUpdate(
                        this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),                        
                        this.articles.length,
                        6
                    )
                }

                if(this.mode == 'obligatorio'){

                   
                        return this.articlesApi.getArticulosObligatorios(
                            this.state.getValueOf('selectedPcrc').id_dp_pcrc,
                            this.state.getValueOf('user').sub,                        
                            this.articles.length,
                            6
                        )

                  
                   
                }

                if(this.mode == 'top'){
                    return this.articlesApi.getArticlesByViews(
                        this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),
                        this.articles.length,
                        6
                    )
                }
            }),
            retryWhen(errors => {
                return errors.pipe(
                    tap(errors => {
                        this.errorSubject.next(true)                        
                        this.placeholders = []                        
                    }),
                    takeUntil(this.error$),
                    tap(result => {
                        this.searchError = true
                        this.errorTimeout = setInterval(()=>{
                            this.searchErrorMessage--
                        },1000)
                    }),
                    delayWhen(() => timer(10*1000)),
                    tap(() => {
                        console.log('retrying...')  
                        this.searchError = false                         
                        clearInterval(this.errorTimeout)
                        this.searchErrorMessage = 5
                    }))
            }),
            tap(articles => {
                this.articles = this.articles.concat(articles)
                this.placeholders = []
            })
        ).subscribe()
    }

    verificartotal(){

        if(this.state.getValueOf('selectedPcrc')!=null){

        this.articlesApi.totalArticleRequired(this.state.getValueOf('selectedPcrc').id_dp_pcrc,this.state.getValueOf('user').sub).subscribe(data=>{
            
                this.total=data[0].total
                this.totalService.total.emit(data[0].total)
   
            
        }) 

    }

    }

    categoriaSeleccionadaStore(categoria){
        this.categorySelected=categoria;
        this.changeModeTo('category')
    }

    categoriaSeleccionada(categoria) {
        this.categorySelected = categoria
        localStorage.setItem('categoria', JSON.stringify(categoria));
        this.changeModeTo('category')
    }

    changeModeTo(mode:mode){
        this.mode = mode
        this.articles = []
        this.scrollSubject.next(1)
    }

    onScroll(event){
        this.scrollSubject.next(1)
       
    }

}