import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, HostListener,Input, AfterViewChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import format from 'date-fns/format';
import toDate from 'date-fns/toDate';
import { NgScrollbar } from 'ngx-scrollbar';
import { map, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from "../../article";
import { RTEViewComponent } from "../rteview/rteview.component";
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { StateService } from "../../services/state.service";
import { CommentsApiService } from 'src/app/api/comments-api.service';
import  Swal from 'sweetalert2'
import { SocketService } from '../../services/socket.service';
import { TranslateService } from '@ngx-translate/core';
import {  fromEvent, interval, Subscription } from 'rxjs';
import { CategoriesApiService } from '../../api/categories-api.service';
import { PcrcApiService } from '../../api/pcrc-api.service';
import { pdfName } from './helper/pdf-name.helper';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements  AfterViewInit,OnInit,OnDestroy{
  
  @ViewChild(RTEViewComponent, { static: false })
  rteview: RTEViewComponent;

  @ViewChild('content', { static: false })
  newsContainer: ElementRef;

  @ViewChild('scroll', { static: false })
  scroll: ElementRef;

  @ViewChild('modalvalidar', { static: false })
  modalvalidar: ElementRef;

  @ViewChild(NgScrollbar, { static: true })
  scrollbarRef: NgScrollbar;

  @Input()
  articleId: string;


  public comments = []
  
  categoria = false
  categoriaList:any[]
  clientesList: any=[]
  condicionverifyfecha: any;
  idArticlePdfId:string = '';
  idcategoria
  idcliente
  idpcrc
  listClient=[]
  mostrar: boolean;
  mostrarbanco: boolean;
  pcrc= false
  pcrcList:any=[]
  pregunta: any[];
  respuesta: any;
  respuesta2: any;
  respuesta3: any;
  respuesta4: any;
  respuestas;
  respuestasUser = [];
  validarCuestionariovariable: any;
  verifyjarvisrequired

  constructor(
    public activatedRoute: ActivatedRoute,
    public renderer: Renderer2,
    public articlesApi: ArticlesApiService,
    public Location: Location,
    public router: Router,
    public googleAnalytics: googleAnalytics,
    public stateService: StateService,
    public commentsApi:CommentsApiService,
    public socketService:SocketService,
    public state:StateService,
    private translate:TranslateService,
    private socket:SocketService,
    private categoriesApi: CategoriesApiService,
    private pcrcApi: PcrcApiService
  ) { }

  // private articleUrl:string;
  public article: Article;
  public modificationDate: string;
  public publicationDate: string;
  public isFavoriteHover = false;
  public startTime: Date;
  public finalTime: Date;
  
  public container: Element;
  public indexElements: Element[];
  public currentScoll: number = 0;

  public modo:'indice'|'tags'|'adjuntos' = 'indice';
  public articulo = null
  public adjuntosVisibles = false

  condiciones=false
  verificar=false
  vistoArtReq=false
  condicionId
  condicionverify
  checkActive=false
  suscripcion:Subscription
  contador=0
  

   @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.sendViewInfo() 
  } 


@HostListener('mousemove', ['$event'])
onMouseMove(event: MouseEvent) {

 this.contador=0 

}

  ngOnInit(){

    this.cargarpcrc();
      
       const observable=interval(1000)
  
       this.suscripcion=observable.subscribe(
         ()=>{
          
          this.contador++
          
          if(this.contador==3600){
            this.router.navigate(['/app/explore'])
          }
          
         }
       )
  
    

  }

  obtenercontador(event){
    this.contador=event
  }

  ngOnDestroy(){

    this.suscripcion.unsubscribe()

  }
  

  ngAfterViewInit() {

      let articleId
      
      this.activatedRoute.params.subscribe(data=>{
        articleId=data.id
        this.idArticlePdfId = data.id;
      })

      this.articlesApi.verifyRequiredFecha(articleId).subscribe(date=>{
        this.condicionverifyfecha=date
      })

      this.articlesApi.verifyRequired(articleId,this.state.getValueOf('user').sub).subscribe(data=>{
        
        if(data==false){

          this.articlesApi.active(articleId,this.state.getValueOf('user').sub).subscribe(data=>{

            if(data[0].validacion_obligatoria!=0){
           
        this.articlesApi.cuestionarioValidar(articleId,this.state.getValueOf('user').sub).subscribe(data=>{
      
          this.validarCuestionariovariable=data[0][0].validar

          if(data[0][0].validar==0){
      
            setTimeout(()=>{
              this.modalvalidar.nativeElement.click() 
            },1000)
      
          }
      
          })

        }

        })

        }

        this.condicionverify=data
        
      })
  
    this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(articleId => {

        this.commentsApi.getComments(articleId, { from: 0, size: 10 }).pipe(
          tap( (comments:any) => {
            this.comments = comments
          
          })
        ).subscribe()

        

        this.articlesApi.verifyArticleJarvis(articleId).subscribe((data:any)=>{
        
          if(data!=null && data.includes(this.state.getValueOf('selectedPcrc').id_dp_pcrc)){
            this.verifyjarvisrequired=true
          }else{
            this.verifyjarvisrequired=false 
          }
        })  

        return this.articlesApi.getArticle(articleId)
      })
    ).subscribe((article: Article) => {
       
      this.article = article;

      this.condicionId=this.article.requerido

      this.rteview.setContent(JSON.parse(this.article.obj || "[]"))

      this.indexElements = Array.from((this.newsContainer.nativeElement as HTMLElement).querySelectorAll('h1,h2,h3,h4,h5,h6'))

      this.indexElements = this.indexElements.filter(el => el['innerText']['length'] > 1)

      this.container = Array.from((this.newsContainer.nativeElement as HTMLElement).querySelectorAll('.ql-editor'))[0]

      this.startTime = new Date();

     /*  this.scrollbarRef.scrolled.subscribe(event => {

        if (event.srcElement.offsetHeight + event.srcElement.scrollTop >= event.srcElement.scrollHeight) {
    
          this.condiciones=true;
        }
    
        if(event.srcElement.scrollTop==0){
        this.condiciones=false;
      }
       
      })

      this.scrollbarRef.scrolled.subscribe(event => {
        this.currentScoll = event.srcElement.scrollTop
      }) */
    

   
    })

   
  
  }

  //PDFEXPORTING
  articlePdfExport() {
    
    this.articlesApi.articlePdfExporter(this.idArticlePdfId).subscribe((data:any)=>{
      //creo URL con el Objeto Blob (pdf) para generar enlace de descarga
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
      a.href = url;
      a.download = pdfName()+'.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    })
  
  }

  obtenerpreguntas(){

    this.articlesApi.obtenerpreguntas(this.article.requerido).subscribe((data:any)=>{
      
    let preguntas=[]

    data.forEach(element => {
      preguntas.push({id:element.id_pregunta,pregunta:element.pregunta})
    });

    var hash = {};

    this.pregunta = preguntas.filter(function(current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });

    this.respuestas=data

    this.respuestas.sort(function() { return Math.random() - 0.5 });
      
    })

  }

  capturar(e,pregunta){

    if(pregunta==0){
      this.respuesta=e.target.value
    }

    if(pregunta==1){
      this.respuesta2=e.target.value
    }

    if(pregunta==2){
      this.respuesta3=e.target.value
    }

    if(pregunta==3){
      this.respuesta4=e.target.value
    }

    
  }

  validarCuestionario(articleId){

    this.respuestasUser.push(this.respuesta,this.respuesta2,this.respuesta3,this.respuesta4)

   let array = this.respuestasUser.filter(function(dato){
    return dato != undefined
  });

   this.articlesApi.validaRespuestas(array).subscribe(data=>{
     
      if (data==1) {

        this.articlesApi.guardarResultado(articleId,this.state.getValueOf('user').sub,array).subscribe()

        Swal.fire(
          this.translate.instant('¡Algo no ha quedado tan claro!'),
          this.translate.instant('Te invitamos a leer la información y realizar nuevamente la validación'),
          'error'
        )
        
      }else{

        this.articlesApi.guardarCuestionario(articleId,this.state.getValueOf('user').sub).subscribe(data=>{

          this.articlesApi.guardarResultado(articleId,this.state.getValueOf('user').sub,array).subscribe()

          Swal.fire(
            this.translate.instant('Excelente'),
            this.translate.instant('Te ha quedado claro el proceso'),
            'success'
          )

        })

      }

   })

    this.respuestasUser=[]

  }

  vistoArticuloObligatorio(id_articulo){

    /*   let articleId
      
      this.activatedRoute.params.subscribe(data=>{
        articleId=data.id
      }) */
    
      Swal.fire({ 
      title: '¿ Estas seguro ?', 
      text: "Aceptas haber leído la información y te comprometes a brindar una asesoría alineada a los datos, procedimientos y procesos aquí establecidos", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: '¡Si, Acepto!',
      cancelButtonText:'Cancelar', 
    }).then((result) => { 
      if (result.isConfirmed) { 
      
        this.articlesApi.viewArticleRequired(id_articulo,this.state.getValueOf('user').sub).subscribe(data=>{
          this.checkActive=true;

          this.activatedRoute.params.subscribe(data=>{
          
          this.articlesApi.active(data.id,this.state.getValueOf('user').sub).subscribe(data=>{

            if(data[0].validacion_obligatoria!=0){

          this.modalvalidar.nativeElement.click() 

            }

          })

        })

        })
        
      }else{
        this.vistoArtReq=false
      } 

    })  

  }

  cancelarvalidacion(){
    this.vistoArtReq=false;
  }

  calculateActive(index) {
    if (this.indexElements[index + 1]) {
      if (this.indexElements[index]['offsetTop'] - 100 < this.currentScoll && this.indexElements[index + 1]['offsetTop'] - 100 > this.currentScoll) {
        return 'active';
      } else {
        return 'na'
      }
    } else {
      return 'na';
    }
  }

  favoriteIcon() {
    // if (this.isFavorite()) {
    //   return 'mdi:heart-multiple'
    // } else {
    //   return 'mdi:cards-heart'
    // }
  }

  goBack() {
    this.Location.back();
   
  }

  

  scrollTo(el: Element) {
    // container.scrollTop = nodeList[2]['offsetTop']
    // this.container.scrollTop = el['offsetTop'];
    this.scrollbarRef.scrollTo({ top: el['offsetTop'] })
    
  }

  searchTag(tag) {
    this.router.navigate(['/app/search'], { queryParams: { tag: tag } })
  }

  goToArticleEdition() {
    if(this.article.type == 'noticia'){
      this.router.navigate(['/app/newseditor', this.article.id ])

    } else {
      this.router.navigate(['/app/articlecreation'], { queryParams: { articleId: this.article.id } })

    }
  }

   sendViewInfo() {
  
     if (!this.finalTime) {
      this.finalTime = new Date()
       this.googleAnalytics.sendEvent(
        'lecture',
        'interaction',
        this.stateService.getValueOf('selectedCliente').cliente + '/' + this.stateService.getValueOf('selectedPcrc').pcrc,
        this.finalTime.getTime() - this.startTime.getTime()
      ) 

       this.articlesApi.postArticleView(this.article.id, this.startTime.getTime(), this.finalTime.getTime())
        .subscribe() 
       
    } 
  
  } 

  articleDelete(){
    this.activatedRoute.params.pipe(
       map(param =>param.id),
       switchMap(id=>{
         return this.articlesApi.getArticle(id)
       })
    ).subscribe(
      data => {
         this.articulo = data
      }
    )

    Swal.fire({

      title: this.translate.instant('Estas Seguro?'),
      text:  this.translate.instant('Tu quieres borrar el articulo'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('Si')

    }).then((result) => {
      if (result.isConfirmed) {
        this.articlesApi.deleteArticle(this.article.id).pipe(
          tap(() => {
            this.router.navigate(['/app/explore'])
            Swal.fire(
              this.translate.instant('Eliminado'),
              this.translate.instant('El articulo se ha eliminado'),
              'success'
            ),
            this.socket.getNotificacionesDelete(this.article.id).subscribe(()=>console.log('eliminado'))
          })
         ).subscribe()
       /*  const {id , title } = this.articulo
        const newArticulo = {
          id,
          title,
          type:'Elimados',
          creator: this.state.getValueOf('user').sub,
          category:this.articulo.categoria_id,
          date: Date.now()
        }

         this.socketService.emit('articuloeliminado', newArticulo) */
      }
    })
  }

  addToFavorites() {
    this.articlesApi.postFavorite(this.article.id).pipe(
      tap(result => {
        this.article.favoritos = result.favoritos
      })
    ).subscribe()
  }

  addLike() {
    this.articlesApi.postLike(this.article.id).pipe(
      tap(result => {
        console.log(result)
        this.article.likes = result.likes
        this.article.dislikes = result.dislikes
      })
    ).subscribe()
  }

  addDislike(){
    this.articlesApi.postDisLike(this.article.id).pipe(
      tap(result => {
        this.article.likes = result.likes
        this.article.dislikes = result.dislikes
      })
    ).subscribe()
  }

  cargarpcrc(){
    this.pcrcApi.getUserPcrc(this.state.getValueOf('user').sub, 0, 1000).pipe(
      tap((pcrcs:any) => {
        this.clientesList = [ { cliente:'Cualquiera', id_dp_clientes:0, pcrcs:[] } ,...pcrcs]
        this.listClient =  this.clientesList.sort((a,b)=>{
           if(a.cliente < b.cliente ) return -1
           if(a.cliente > b.cliente ) return 1
           return 0
        })
        
      })
    ).subscribe()
  }

  seleccionarcliente(event){
  
    this.idcliente=event
    this.clientesList.forEach(data =>{
      if(data.id_dp_clientes==event){
        this.pcrcList=data.pcrcs
        this.pcrc= true 
      }
    })

  }

  seleccionarpcrc(event){

    this.idpcrc=event

    this.categoriesApi.getCategories(event.toString()).subscribe(
      data=>{
        this.categoriaList=data.value
        this.categoria= true 
      }
    )

  }

  seleccionarcategoria(event){

    this.idcategoria=event

  }

  guardardatos(){

    if(this.idcliente==undefined){

      return Swal.fire(
        this.translate.instant('Error'),
        this.translate.instant('Selecciona un cliente'),
        'error'
      )

    }

    if(this.idpcrc==undefined){

      return Swal.fire(
        this.translate.instant('Error'),
        this.translate.instant('Selecciona un pcrc'),
        'error'
      )

    }

    if(this.idcategoria==undefined){

      return Swal.fire(
        this.translate.instant('Error'),
        this.translate.instant('Selecciona una categoria'),
        'error'
      )

    }

    this.articlesApi.cambioarticulo(this.article.id,this.idpcrc,this.idcategoria).subscribe(data=>{
      
      return Swal.fire(
        this.translate.instant('Cambiado'),
        this.translate.instant('El artículo ha sido cambiado de categoría'),
        'success'
      )
      
    })

  }

}
