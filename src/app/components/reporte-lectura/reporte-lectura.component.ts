import { Component, OnInit, ElementRef, Inject, Input} from '@angular/core';
import {DOCUMENT} from '@angular/common'
import { first, tap } from 'rxjs/operators';
import { CategoriesApiService, categoryRaw } from "../../api/categories-api.service";
import { JarvisApiService, personData } from "../../api/jarvis-api.service";
import { cliente, PcrcApiService } from "../../api/pcrc-api.service";
import { StateService } from "../../services/state.service";
import { Article } from '../../article';
import { ReportsApiService } from "../../api/reports-api.service";
import { posibleFilterFields, commentsReport } from "../../api/reports-api.service";
import format from 'date-fns/format';
import {ExportExcelService} from 'src/app/api/export-excel.service';
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reporte-lectura',
  templateUrl: './reporte-lectura.component.html',
  styleUrls: ['./reporte-lectura.component.css']
})
export class ReporteLecturaComponent implements OnInit {


  public initialDateDrop = false
  public finalDateDrop = false
  generando = false
  public categoryDrop = false
  public articlesDrop = false

  public isDirectorActive = false
  public isGerenteActive = false
  public isCoordinadorActive = false
  public isLiderActive = false
  public isPcrcActive = false
  public isCategoriaActive = false
  public isArticleActive = false  

  clientesList: cliente[]
  pcrcList: cliente['pcrcs'][0][]
  categoriesList: {
    state: "finish" | "loading";
    value?: categoryRaw[];
  }
  
  directores: personData[]
  gerentesList: personData[]
  coordisList: personData[]
  lideresList: personData[]

  selectedCliente: cliente
  selectedPcrc: cliente['pcrcs'][0]
  selectedCategory: categoryRaw
  selectedArticle: Article

  selectedDirector: personData
  selectedGerente: personData
  selectedCoordi: personData
  selectedLider: personData

  initialDate:Date
  finalDate:Date
  initialDateHumanRead = ''
  finalDateHumanRead = ''
  initialDateParam=''
  finalDateParam=''
  date=''

  data:any;
  dataLimit:any;
  verificar:boolean;
  currentPage = 1;
  pageSize = 12;
  totalItems:number = 0;
  textCliente=""
  textPcrc=""
  page = 1
  numeroexportar=[]
  numeroexportapag
  pagexportar
  totalpage
  atras=false
  siguiente=false
  selectedData: commentsReport['items'][0];
  loading = false
  cargando = false
  expo= false

  constructor(
    @Inject(DOCUMENT) document,
    public state: StateService,
    public pcrcApi: PcrcApiService,
    public jarvisApi: JarvisApiService,
    public categoriesApi: CategoriesApiService,
    public reportsApi: ReportsApiService,
    public excelservice:ExportExcelService,
    public elem: ElementRef,
    public router:Router,
    private translate: TranslateService
   
  ) { }
  
  ngOnInit() {
   
    this.cargando= true
    this.pcrcApi.getUserPcrc(this.state.getValueOf('user').sub, 0, 1000).pipe(
      tap(pcrcs => {
        this.clientesList = [ { cliente:'Cualquiera', id_dp_clientes:0, pcrcs:[] } ,...pcrcs]
      
        this.cargando= false
      })
    ).subscribe()

    this.verificar=false;
 
  }

  getTexto(event){
    this.textCliente = event
  }

  getPcrc(event){
    this.textPcrc = event
  }
  
  clienteSelected(selectedClient: any) {
   
  
   
    this.selectedCliente = selectedClient

    this.isPcrcActive = true

    this.pcrcList = [ { cod_pcrc:'0', id_dp_pcrc:0, pcrc:'Cualquiera' } , ...selectedClient.pcrcs ]
  
    this.categoriesList = null
 
    this.selectedCategory = null

    this.selectedPcrc = null

  }

  pcrcSelected(event: cliente['pcrcs'][0]) {
   /*  const boton = <HTMLInputElement> document.getElementById('button')
    boton.disabled= false */

    this.selectedPcrc = event

    this.selectedCategory = null

    this.categoriesApi.getCategories(this.selectedPcrc.id_dp_pcrc.toString()).pipe(
      tap(categories => {
        if(categories.state == 'finish'){
          this.categoriesList = { state:'finish', value:[ {
            icon:'',
            id:'',
            name:'Cualquiera',
            parent_id:'',
            base_id:'',
            position:0
          }, ...categories.value] }

        } else {
          this.categoriesList = categories

        }

        this.isCategoriaActive = true;
      })
    ).subscribe()

  }

  categorySelected(event: categoryRaw) {

    this.selectedCategory = event

    this.isArticleActive = true

  }

  articleSelected(event: Article) {
    this.articlesDrop = false
    this.selectedArticle = event
  }

  onInitialDateChange(event: { value: Date }) {
    this.initialDate = event.value
    this.initialDate.setHours(0)
    this.initialDate.setMinutes(0)
    this.initialDateHumanRead = format(this.initialDate, "dd/MM/y")
    this.initialDateParam = format(this.initialDate, "y-MM-dd")
  }

  onFinalDateChange(event: { value: Date }) {
    this.finalDate = event.value
    this.finalDate.setHours(23)
    this.finalDate.setMinutes(59)
    this.finalDateHumanRead = format(this.finalDate, "dd/MM/y")
    this.finalDateParam = format(this.finalDate, "y-MM-dd")
    this.date=(this.finalDate.getFullYear()+"/"+(this.finalDate.getMonth()+1)+"/"+(this.finalDate.getDate()+1))
   
  }  

  async totalpaginas(){
    return new Promise<void>((resolve, reject) => {
      this.reportsApi.getLecturaTotal(this.initialDateParam, this.finalDateParam, this.selectedPcrc.id_dp_pcrc)
        .pipe(first())
        .subscribe(
          (data:any) => {
           
            this.totalpage = data.total_lecturas;
            this.numeroexportar=data.total_exportar
            resolve();
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  async totalpaginascategoria(){
    return new Promise<void>((resolve, reject) => {
      this.reportsApi.getLecturaCategoriaTotal(this.initialDateParam, this.finalDateParam, this.selectedCategory.id)
        .pipe(first())
        .subscribe(
          (data:any) => {
            this.totalpage = data.total_lecturas;
            this.numeroexportar=data.total_exportar
            resolve();
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  async validarpaginaspcrc(){
 
    if(this.page==1 && this.page==this.totalpage){
      this.atras=true
      this.siguiente=true
      return
    }

    if(this.page==1){
      this.atras=true
    }else{
      this.atras=false
    }  
  
    if(this.page==this.totalpage){
      this.siguiente=true
    }else{
      this.siguiente=false
    }

  }

  async search() {

    if(this.initialDateParam=="" || this.finalDateParam=="" ){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.translate.instant('LLenar campos de fecha')
      })
     }
     
   if(!this.textCliente){
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: this.translate.instant('Selecciona el cliente')
    })
   }

   if(!this.textPcrc){
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: this.translate.instant('Selecciona el pcrc')
    })
   }

    this.loading= true 

    this.page=1
    this.numeroexportar=[] 

    if (!!this.selectedCategory && this.selectedCategory.name != 'Cualquiera') {

      await this.totalpaginascategoria();

    }

    if(this.selectedCategory==null){

    await this.totalpaginas();

    }
    
    await this.validarpaginaspcrc();

    await this.getFilters();

    this.loading=false
  
  }

  getverify(data){

    if((([].concat.apply({}, data).length)-1)===0){
      this.verificar=false;
   }else{
     this.verificar=true;
   }
  }

  limpiar()
    {
      this.page=1
      this.router.navigate(['/app/redirect/lecturabilidad'])
    }

  getFilters() {

    

   this.elem.nativeElement.querySelector('table').classList.add('show')
   this.elem.nativeElement.querySelector('.btn-primary').classList.add('show')
   this.elem.nativeElement.querySelector('.btn-primary2').classList.add('show')

   
    
    let filter1: { filter: posibleFilterFields, value: string }

    let filter2: { filter: posibleFilterFields, value: string }

    if (!!this.selectedCliente && this.selectedCliente.cliente != 'Cualquiera') {

      filter1 = { value: this.selectedCliente.id_dp_clientes.toString(), filter: 'cliente' }

      if (!!this.selectedPcrc && this.selectedPcrc.pcrc != 'Cualquiera') {

        filter1 = { value: this.selectedPcrc.id_dp_pcrc.toString(), filter: 'pcrc' }
      
       
         if(this.selectedCategory==null){
        
          this.reportsApi.getLecturaPcrc(this.initialDateParam,this.finalDateParam,this.selectedPcrc.id_dp_pcrc, this.page).subscribe(
            data =>{
               this.dataLimit= data
              
               this.getverify(data)
            },err=>console.log(err)
          ) 
          
         }
       
        if (!!this.selectedCategory && this.selectedCategory.name != 'Cualquiera') {
          filter1 = { value: this.selectedCategory.id, filter: 'categoria' }
              

               this.reportsApi.getLecturacategoria(this.initialDateParam,this.finalDateParam,this.selectedCategory.id, this.page).subscribe(
                data=> {
               
                  this.dataLimit=data,
                  this.getverify(data)
                },
                err=>console.log(err)
               ) 


         if (!!this.selectedArticle && this.selectedArticle.title != 'Cualquiera') {

            filter1 = { value: this.selectedArticle.id, filter: 'articulo' }
           
          
             
         } 
        }
      }
    }

  }

  preview(){
    this.page--
    this.validarpaginaspcrc()

   if(this.selectedCategory== null){
    
        this.reportsApi.getLecturaPcrc(this.initialDateParam,this.finalDateParam,this.selectedPcrc.id_dp_pcrc, this.page).subscribe(
          data =>{
            this.dataLimit= data
           
          },err=>console.log(err)
        ) 
      
       
      }

      if (!!this.selectedCategory && this.selectedCategory.name != 'Cualquiera') {

        this.reportsApi.getLecturacategoria(this.initialDateParam,this.finalDateParam,this.selectedCategory.id, this.page).subscribe(
          data=> {
         
            this.dataLimit=data,
            this.getverify(data)
          },
          err=>console.log(err)
         ) 

      }
     

 }

 next(){
  this.page++
  this.validarpaginaspcrc()

    if(this.selectedCategory==null){
       this.reportsApi.getLecturaPcrc(this.initialDateParam,this.finalDateParam,this.selectedPcrc.id_dp_pcrc, this.page).subscribe(
        data =>{
          this.dataLimit= data
     
        },err=>console.log(err)
      ) 
    }

    if (!!this.selectedCategory && this.selectedCategory.name != 'Cualquiera') {

      this.reportsApi.getLecturacategoria(this.initialDateParam,this.finalDateParam,this.selectedCategory.id, this.page).subscribe(
        data=> {
       
          this.dataLimit=data,
          this.getverify(data)
        },
        err=>console.log(err)
       ) 

    }

  
 }

 seleccionarexport(event){

  this.pagexportar=event

 }

 sendData(){

  if(this.pagexportar==0){
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: this.translate.instant('Selecciona pagina exportable')
    })

  }

  this.generando = true

  if (this.selectedCategory==null) {

  this.reportsApi.getReportLecturaPcrc(this.initialDateParam, this.finalDateParam, this.selectedPcrc.id_dp_pcrc,this.pagexportar)
  .subscribe(
    response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const file = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = file;
      a.download = 'pagina_'+this.pagexportar+'_del_pcrc_'+this.selectedPcrc.pcrc+'.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.generando = false
    }
  )

  }

  if(!!this.selectedCategory && this.selectedCategory.name != 'Cualquiera'){

    this.reportsApi.getReportLecturaCategoriaPcrc(this.initialDateParam, this.finalDateParam, this.selectedCategory.id,this.pagexportar)
  .subscribe(
    response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const file = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = file;
      a.download = 'pagina_'+this.pagexportar+'_de_la_categoria_'+this.selectedCategory.name+'.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.generando = false
    }
  )

  }

   }

  }


