import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { interval, of } from 'rxjs';
import { DOCUMENT, Location } from '@angular/common'; 
import { concatMap, filter, map, switchMap, throttle, tap } from 'rxjs/operators';
import { ArticlesApiService, postArticleDTO } from "../../api/articles-api.service";
import { Article } from "../../article";
import { RichTextEditorComponent } from "../rich-text-editor/rich-text-editor.component";
import { environment } from '../../../environments/environment';
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";
import {NgxSpinnerService} from 'ngx-spinner'
import { RepositorioApiService } from 'src/app/api/repositorio-api.service';
import { StateService } from 'src/app/services/state.service';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr'
import { SocketService } from 'src/app/services/socket.service';
import { TranslateService } from '@ngx-translate/core';
import { Options } from 'select2';

@Component({
  selector: 'app-article-creator',
  templateUrl: './article-creator.component.html',
  styleUrls: ['./article-creator.component.css']
})
export class ArticleCreatorComponent implements OnInit {

  public options: Options;
  public options2: Options;

  documentos:any = []
  document
  pcrcList
  clientesList
  preguntas
  activarCuestionario=0

  borrador:string
  publicado:string
  borradorD:string
  Publicar:string

  creado:string
  editado:string
  validar:Boolean=true
  eliminado:string
  file:any
   loading = false
  @ViewChild('modal',{static:false}) modal:ElementRef
  foco: any;
  arraypreguntas: any[];
  respuestas: any[][];
  
  constructor(
    private articlesApi:ArticlesApiService,
    private route: ActivatedRoute,
    private router: Router,
    private articlesWebSockets: ArticlesWebSocketsService,
    private spinner:NgxSpinnerService,
    private repositoryService:RepositorioApiService,
    public state:StateService,
    private location:Location,
    private toastr:ToastrService,
    public socketService:SocketService,
    private Translate:TranslateService,
    @Inject(DOCUMENT) document,
   
  ) {
    this.borrador  = this.Translate.instant('Guardado en borradores') 
    this.publicado = this.Translate.instant('Publicado')
    this.borradorD = this.Translate.instant('borrador')
    this.Publicar=this.Translate.instant('Publicar')
    this.creado=this.Translate.instant('Articulo creado exitosamente')
    this.editado=this.Translate.instant('Articulo editado exitosamente')
    this.eliminado =this.Translate.instant('Eliminado')
   }
   
  public tags:string[] = [];
  private seletedCategory:string;
  private contentOnEditor:Object[];
  private textOnEditor:string;
  public newFiles:string[] = [];
  public status = '';
  public addArticleSpinner = false;
  public updateArticleSpinner = false;
  public sinContenidoModalOpen = false;
 

  @ViewChild(RichTextEditorComponent,{ static:false }) RTE:RichTextEditorComponent;
  @ViewChild('articleTitle',{ static:false }) public articleTitle:ElementRef ;
  @ViewChild('tagstext',{ static:false }) public tagsText:ElementRef;
  @ViewChild('element', {static:false}) element: ElementRef

  public articleToEdit:Article;

  public path = {
    saveUrl: ``,
    removeUrl: ``
  };
  categoria
  accion=false
  accionText="Articulo Obligatorio Desactivado"
  accionTextedit="Articulo Edicion Obligatorio Desactivado"
  fechafinal
  fechainicial
  titulorequired
  ocultarbtnobligatorio
  ocultarbtnobligatorioedit
  cliente
  obtCliente
  pcrc=[]
  Obedit
  accionCuestionario=false
  preguntastotal
  pregunta1
  respuestacorrecta1
  respuesta1
  respuesta2
  respuesta3
  pregunta2
  respuestacorrecta2
  respuesta4
  respuesta5
  respuesta6
  pregunta3
  respuestacorrecta3
  respuesta7
  respuesta8
  respuesta9
  pregunta4
  respuestacorrecta4
  respuesta10
  respuesta11
  respuesta12
  

  

  ngAfterViewInit(){

    

    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };

    this.options2 = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
  
    
    let editArticleObservable = this.route.queryParamMap.pipe(
      filter((params:ParamMap) => params.has('articleId') && !params.has('category') ),
      map((params:ParamMap) => params.get('articleId')),
      switchMap(articleId => this.articlesApi.getArticle(articleId))
    ).subscribe(article => {
      this.articleToEdit = article;

      this.path = {
        saveUrl: `${environment.endpoint}/api/articles/${this.articleToEdit.id}/files`,
        removeUrl: `${environment.endpoint}/files/${this.articleToEdit.id}/delete`
      };

      this.articleTitle.nativeElement.value = this.articleToEdit.title;

      this.tags = this.articleToEdit.tags;
      this.tagsText.nativeElement.value = this.tags.join(',');

      this.RTE.setContent( JSON.parse((this.articleToEdit.obj || "[]")) );

    })
  
    let newArticleObservable = this.route.queryParamMap.pipe(
      filter((params:ParamMap) => !params.has('articleId') && params.has('category') ),
      map((params:ParamMap) => params.get('category'))
    ).subscribe(category => {
      this.seletedCategory = category
      this.categoria = category
    })
  }

  ngOnInit() { 
  
  

    this.articlesApi.getCliente().subscribe((data:any)=>{

      this.cliente=data.map(item=>{
        return {
          id:item.id_dp_clientes,
          text:item.cliente
        }
      })


    })

     this.getrepositorio()

     this.route.queryParamMap.pipe(
      filter((params:ParamMap) => !params.has('articleId') && params.has('category') ),
      map((params:ParamMap) => params.get('category'))
    ).subscribe(category => {
      this.categoria = category
    })

    this.route.queryParamMap.subscribe((data:any)=>{
      this.ocultarbtnobligatorio=data.params.category
    })

    this.route.queryParamMap.subscribe((data:any)=>{
      this.ocultarbtnobligatorioedit=data.params.articleId
    })

    this.articlesApi.getArticulosObligatoriosEdit(this.ocultarbtnobligatorioedit).subscribe((data:any)=>{
      this.Obedit=data.length
    })

   
  }

  log(focus){
    if(focus==false){
      this.obtenerPcrcs()
    }
  }

  obtenerPcrcs(){

    this.articlesApi.getPcrc(this.clientesList).subscribe((data:any)=>{
    
      this.pcrc=data.map(item=>{
        return {
          id:item.id_dp_pcrc,
          text:item.pcrc+" "+item.cod_pcrc
        }
      })

    })

   

  }

  accionF(accion){

    if (accion!=true) {
     
      this.accionText="Articulo Obligatorio Activado"

    }else{

      this.accionText="Articulo Obligatorio Desactivado"

    }

  }

  accionE(accion){

    if (accion!=true) {
     
      this.accionTextedit="Articulo Editar Obligatorio Activado"

    }else{

      this.accionTextedit="Articulo Editar Obligatorio Desactivado"

    }

  }

  guardarCuestionario(preguntastotal,pregunta1,respuestacorrecta1,respuesta1,respuesta2,respuesta3,pregunta2,respuestacorrecta2,respuesta4,respuesta5,respuesta6
    ,pregunta3,respuestacorrecta3,respuesta7,respuesta8,respuesta9,pregunta4,respuestacorrecta4,respuesta10,respuesta11,respuesta12){

    if(preguntastotal==1){

    if(pregunta1==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de pregunta no puede quedar vacio')
      })

      return
      
    }

    if(respuestacorrecta1==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta correcta no puede quedar vacio')
      })

      return
      
    }

    if(respuesta1==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta 1 no puede quedar vacio')
      })

      return
      
    }

  }

  if(preguntastotal==4){

    if(pregunta4==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de pregunta no puede quedar vacio')
      })

      return
      
    }

    if(respuestacorrecta4==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta correcta no puede quedar vacio')
      })

      return
      
    }

    if(respuesta10==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta 1 no puede quedar vacio')
      })

      return
      
    }

  }


  if(preguntastotal==3){

    if(pregunta3==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de pregunta no puede quedar vacio')
      })

      return
      
    }

    if(respuestacorrecta3==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta correcta no puede quedar vacio')
      })

      return
      
    }

    if(respuesta7==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta 1 no puede quedar vacio')
      })

      return
      
    }

  }

  if(preguntastotal==2){

    if(pregunta2==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de pregunta no puede quedar vacio')
      })

      return
      
    }

    if(respuestacorrecta2==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta correcta no puede quedar vacio')
      })

      return
      
    }

    if(respuesta4==undefined){
      
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('Campo de respuesta 1 no puede quedar vacio')
      })

      return
      
    }

  }


    this.arraypreguntas=[pregunta1,pregunta2,pregunta3,pregunta4]

    let respuestas1=[respuestacorrecta1,respuesta1,respuesta2,respuesta3]

    let respuestas2=[respuestacorrecta2,respuesta4,respuesta5,respuesta6]

    let respuestas3=[respuestacorrecta3,respuesta7,respuesta8,respuesta9]

    let respuestas4=[respuestacorrecta4,respuesta10,respuesta11,respuesta12]

    this.respuestas=[respuestas1,respuestas2,respuestas3,respuestas4]

    this.accionCuestionario=true

    this.activarCuestionario=1

    Swal.fire({
      icon: 'success',
      title: 'Cuestionario Guardado Temporalmente',
      text: this.Translate.instant('Solo sera guardado cuando el articulo sea creado')
    })



  }

  getrepositorio(){
    this.route.queryParams.subscribe((param)=>{
      this.repositoryService.getRepositorioId(param.articleId).subscribe(
        res=>{
         this.documentos= res
        
        },
        err=>console.log(err)
      )
    })

   /*  this.route.params.pipe(
      map(param => param.articleId),
      switchMap(id => this.repositoryService.getRepositorioId(id))
      ).subscribe(
      res=>{
        this.documentos= res
       
       },
       err=>console.log(err)
    ) */
  }

  saveImage(){
    this.loading = true
    const file:any = document.getElementById('file')
   
    if(file.value == ""){ 
      this.loading= false
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('seleccione un archivo')
      })
      
    }

  /*   if(file.files[0].type !=="image/jpeg" || file.files[0].type !=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.files[0].type !=="image/png" || file.files[0].type !=="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formato no pemritido',
      })
    } */
 
    if(file.files[0].size >30000000){
      this.loading= false
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:   this.Translate.instant('El tamaño del archivo supera los 30mb')
      })
    }

    if(this.file == null){
      this.loading= false
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.Translate.instant('seleccione un archivo'),
      })
    }


    const formdata:FormData = new FormData()
    const username = this.state.getValueOf('user').name
   
    formdata.append('image',this.file )
    formdata.append('username',username )
    this.repositoryService.saveRepositorio(this.route.snapshot.queryParams.articleId, formdata).subscribe(
    (res:any)=>{
        Swal.fire({
          icon:'success',
          title:  this.Translate.instant('Documento guardado'),
          showConfirmButton: false,
          timer: 1500
        
          
        })
         this.loading= false
         const file:any = document.getElementById('file')
         file.value=null
         this.getrepositorio()
         document.getElementById('file-name').innerHTML=this.Translate.instant('Selecicone o arrastre el archivo')
      },
      err=>{
        console.log(err)
      }
    )

   return
  }


  uploadImage(e){
    if(e.target.files && e.target.files.length > 0){
       this.file = e.target.files[0]
       document.getElementById('file-name').innerHTML=e.target.files[0].name
    }
  }

  obtenerId(id){
    this.documentos.forEach(element => {
        if(element.id === id){
          this.document= element
        }
    });
    
   
  }


  borradorDocumento(document){
    const usuario = this.state.getValueOf('user').name
  
    Swal.fire({
      title: this.Translate.instant('Quieres eliminar el documento'),
      showCancelButton: true,
      confirmButtonText: this.Translate.instant('Delete'),
     
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.repositoryService.deleteRepositorioBorrador(document.id, usuario).pipe(
          tap(
            res=>{
              
              this.getrepositorio()
              Swal.fire(this.Translate.instant('Eliminado'), '', 'success')

            },
            err=>console.log(err)
          )
        ).subscribe()
      
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
   
   
  }
  
  addTag(textInput:string){
    this.tags = textInput.replace(/#/gi,'').replace(/ /gi,',').split(',').filter(word => !!word && word.length >= 3)
  }

  deleteTag(tagToDelete:string){
    this.tags = this.tags.filter(tag => tag != tagToDelete)
  }

  saveArticle(){
    
   this.addArticleSpinner = true;

    if(this.RTE.getContent().length > 24 && this.articleTitle.nativeElement.value.length > 0){

      if(this.accion==true){

        if(this.fechainicial == undefined || this.fechafinal == undefined || this.titulorequired==undefined){ 

          this.addArticleSpinner = false;

          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.Translate.instant('No puede dejar los campos de fechas vacios')
          })
          
        }
  
        if(this.fechainicial>this.fechafinal){

          this.addArticleSpinner = false;
          
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.Translate.instant('La fecha Inicial debe ser menor que la final')
          })
          
        }

    }

      if(!!this.articleToEdit){
 
          let newArticle:postArticleDTO = {
            attached:[ ...this.articleToEdit.attached, ...this.newFiles ],
            category:this.articleToEdit.category,
            content:this.RTE.getText(),
            obj:this.RTE.getContent(),
            state:'1',
            role:"articulo",
            tags:this.tags,
            title:this.articleTitle.nativeElement.value
          };

          of(null).pipe(
            throttle(() => interval(700)),
            concatMap(() => this.articlesApi.updateArticle(this.articleToEdit.id, newArticle).pipe())
          ).subscribe(result => {

            if(this.accion!=false){

              this.articlesApi.postArticleRequired(this.articleToEdit.id,this.pcrcList,this.fechainicial,this.fechafinal,this.titulorequired,this.activarCuestionario).subscribe(data=>{
                
                if(this.accionCuestionario==true){

                  this.articlesApi.guardarPreguntas(data,this.arraypreguntas,this.respuestas).subscribe()
    
                }
                
              })
  
            }else{

              this.articlesApi.habilitarobligatorio(this.ocultarbtnobligatorioedit).subscribe()

            }
          
            let partialArticle:Partial<Article> = {
              creator:this.articleToEdit.creator,
              title:this.capitalizer(newArticle.title),
              id:this.articleToEdit.id,
              subLine: this.articleToEdit.subLine,
              line: this.articleToEdit.line,
              category : this.articleToEdit.category
            }
            
            // this.articlesWebSockets.sendNotification('articleUpdate', partialArticle)
            this.toastr.info(this.editado,'',{timeOut:2000}) 
            this.addArticleSpinner = false;
            this.goToArticle(this.articleToEdit.id)

              const article = {
                id:this.articleToEdit.id,
                title:this.capitalizer(this.articleTitle.nativeElement.value),
                creator:this.state.getValueOf('user').sub,
                type:'Edicion',
                category : this.categoria,
                date:Date.now()
              }

              this.socketService.getNotificacionesActive().pipe(
                tap(
                  (res:any) => {
                      this.socketService.getNotificacionesUpdate(article).subscribe(console.log)
                  }
                )
              ).subscribe()
              

          })
        
      } else if(!!this.seletedCategory) {
           
          let newArticle:postArticleDTO  = {
            attached:[],
            category:this.seletedCategory,
            content: this.RTE.getText(),//! arreglar el contenido 🖐
            obj:this.RTE.getContent(),
            role:"articulo",
            state:'1',
            tags:this.tags,
            title:this.capitalizer(this.articleTitle.nativeElement.value)
          };

          of(null).pipe(
            throttle(() => interval(700)),
            concatMap(() => this.articlesApi.postArticle(newArticle, true, this.validar  )),
            tap(newArticle => {
               
              let partialArticle:Partial<Article> = {
                creator:newArticle.creator,
                title:this.capitalizer(newArticle.title),
                id:newArticle.id,
                subLine: newArticle.subLine,
                line: newArticle.line,
                category : newArticle.category
              }

              const article = {
                id:newArticle.id,
                title:this.capitalizer(this.articleTitle.nativeElement.value),
                creator:this.state.getValueOf('user').sub,
                type:'Creacion',
                category : this.categoria,
                date:Date.now()
              }


               this.articlesWebSockets.sendNotification('newarticle', partialArticle)
              
               this.socketService.getNotificacionesActive().subscribe(
               (  res:any) => {

                    this.socketService.getNotificacionesCreate(article).subscribe(console.log) 
    
                 }
               )
            
               if(this.accion!=false){

              this.articlesApi.postArticleRequired(newArticle.id,this.pcrcList,this.fechainicial,this.fechafinal,this.titulorequired,this.activarCuestionario).subscribe(data=>{
                
                if(this.accionCuestionario==true){

                  this.articlesApi.guardarPreguntas(data,this.arraypreguntas,this.respuestas).subscribe()
    
                }
                
              })
  
            }

              this.addArticleSpinner = false;




              this.toastr.info(this.creado,'',{timeOut:2000}) 
              this.goToArticle(newArticle.id)
              

            })
          ).subscribe()

      }
    } else {
      this.sinContenidoModalOpen = true;
      this.addArticleSpinner = false;
    } 
  }

  saveAsDraft(){
    this.updateArticleSpinner = true;
 
    if(this.RTE.getContent().length > 24 && this.articleTitle.nativeElement.value.length > 0){
     
      if(!!this.articleToEdit){
        let newArticle:postArticleDTO = {
          attached:[ ...this.articleToEdit.attached, ...this.newFiles ],
          category:this.articleToEdit.category,
          content:this.RTE.getText(),
          obj:this.RTE.getContent(),
          role:"articulo",
          state:'2',
          tags:this.tags,
          title:this.articleTitle.nativeElement.value
        };
    
        of(null).pipe(
          throttle(() => interval(700)),
          concatMap(() => this.articlesApi.updateArticle(this.articleToEdit.id, newArticle).pipe())
        ).subscribe(newArticle => { 
          console.log('dos')       
          this.articleToEdit.state = 'archived'
          this.updateArticleSpinner = false;
     
        })   


      }else if(!!this.seletedCategory){
        let newArticle:postArticleDTO  = {
          attached:[],
          category:this.seletedCategory,
          content: this.RTE.getText(),//! arreglar el contenido 🖐
          obj:this.RTE.getContent(),
          role:"articulo",        
          state:'2',
          tags:this.tags,
          title:this.articleTitle.nativeElement.value
        };

        of(null).pipe(
          throttle(() => interval(700)),
          concatMap(() => this.articlesApi.postArticle(newArticle, true, this.validar))
        ).subscribe(newArticle => {        
          this.updateArticleSpinner = false;
          this.articleToEdit = newArticle 
          this.router.navigate(['/app/articlecreation'],{ queryParams: { articleId: newArticle.id }})       
        })
      }

     } else {
      this.sinContenidoModalOpen = true;
      this.updateArticleSpinner = false;
    }
    this.spinner.hide()
     this.location.back();

  }

  goToArticle(articleId:string){
    this.router.navigate(['/app/articles/' + articleId])
  }

  getArticleId(){
    if(this.articleToEdit){
      return this.articleToEdit.id;
    }else{
      return ''
    }
  }

  contentOnEditorChange(content){
    this.contentOnEditor = content.content;
    this.textOnEditor = content.text;
  }

  onFileUploaded(filesData){
    if(filesData.operation == "upload"){
      this.articleToEdit.attached.push(filesData.file.name)      
      this.status = 'Cargado con exito'
    }
  }

  fileDeleted(fileName){
    this.articleToEdit.attached = this.articleToEdit.attached.filter(file => file != fileName )    
  }

  onFileSelect(event){
    console.log('prueba')
    if(event.filesData.length){
      let duplicateIndex = this.articleToEdit.attached.find(fileName => fileName == event.filesData[0].name )
      if(duplicateIndex){
        event.isCanceled = true;
        this.status = 'archivo duplicado'
      }else{
        this.status = event.filesData[0].name
      }
    }
  }


  
  capitalizer(field){
    return field.charAt().toUpperCase() + field.slice(1).toLowerCase() 
  }


 

}
