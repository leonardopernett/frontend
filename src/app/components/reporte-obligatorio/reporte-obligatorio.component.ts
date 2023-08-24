import { Component, ElementRef, OnInit } from '@angular/core';
import { format } from 'date-fns';
import {  first, tap } from 'rxjs/operators';
import { CategoriesApiService, categoryRaw } from 'src/app/api/categories-api.service';
import { JarvisApiService, personData } from 'src/app/api/jarvis-api.service';
import { cliente, PcrcApiService } from 'src/app/api/pcrc-api.service';
import { posibleFilterFields, ReportsApiService } from 'src/app/api/reports-api.service';
import { Article } from 'src/app/article';
import { StateService } from 'src/app/services/state.service';
import {ExportExcelService} from 'src/app/api/export-excel.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import XLSX from 'xlsx'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reporte-obligatorio',
  templateUrl: './reporte-obligatorio.component.html',
  styleUrls: ['./reporte-obligatorio.component.css']
})

export class ReporteObligatorioComponent implements OnInit {
  
  pages= 0
  page=1
  totalpage
  public initialDateDrop = false
  public finalDateDrop = false
  
  public categoryDrop = false
  public articlesDrop = false

  public isDirectorActive = false
  public isGerenteActive = false
  public isCoordinadorActive = false
  public isLiderActive = false
  public isPcrcActive = false
  public isCategoriaActive = false
  public isArticleActive = false  
  cargando = false
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
  pagexportar
  data:any;
  verificar:boolean;
  currentPage = 1;
  pageSize = 12;
  totalItems:number = 0;
   p=1
  tableIsLoading = false;
   textClient=""
   textPcrc=""
  usuarios=0;
  lectura=0;
  atras=false
  siguiente=false
  numeroexportar=[]
  generando = false

  constructor(
    public state: StateService,
    public pcrcApi: PcrcApiService,
    public jarvisApi: JarvisApiService,
    public categoriesApi: CategoriesApiService,
    public reportsApi: ReportsApiService,
    public excelservice:ExportExcelService,
    public router :Router,
    private translate: TranslateService,
    public elem: ElementRef
  ) { }

  ngOnInit() {
    this.cargando = true

    this.pcrcApi.getUserPcrc(this.state.getValueOf('user').sub, 0, 1000).pipe(
      tap(pcrcs => {
        this.clientesList = [ { cliente:'Cualquiera', id_dp_clientes:0, pcrcs:[] }, ...pcrcs]
        this.cargando = false

      })
    ).subscribe()
    this.verificar=false;

  }

  getClient(event){
      this.textClient = event
  }

  getPcrc(event){
      this.textPcrc = event
  }

  clienteSelected(selectedClient: cliente) {

    this.selectedCliente = selectedClient

    this.isPcrcActive = true

    this.pcrcList = [ { cod_pcrc:'0', id_dp_pcrc:0, pcrc:'Cualquiera' } , ...selectedClient.pcrcs ]

    this.categoriesList = null

    this.selectedCategory = null

    this.selectedPcrc = null

  }

  pcrcSelected(event: cliente['pcrcs'][0]) {

    this.selectedPcrc = event

    this.selectedCategory = null

    this.categoriesApi.getCategories(this.selectedPcrc.id_dp_pcrc.toString()).pipe(
      tap(categories => {
        if(categories.state == 'finish'){
          this.categoriesList = { state:'finish', value:[ {
            icon:'',
            id:'',
            name:'Cualquiera',
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
    this.initialDateParam = format(this.initialDate, "y/MM/dd")
  }

  onFinalDateChange(event: { value: Date }) {
    this.finalDate = event.value
    this.finalDate.setHours(23)
    this.finalDate.setMinutes(59)
    this.finalDateHumanRead = format(this.finalDate, "dd/MM/y")
    this.finalDateParam = format(this.finalDate, "y/MM/dd")
  } 

  async totalpaginas(){
    return new Promise<void>((resolve, reject) => {
      this.reportsApi.getObligatorioTotal(this.selectedPcrc.id_dp_pcrc,this.initialDateParam, this.finalDateParam,this.usuarios )
        .pipe(first())
        .subscribe(
          (data:any) => {
           
            this.totalpage = data.total_obligatorio;
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
      this.reportsApi.getObligatorioCategoriaTotal(this.selectedPcrc.id_dp_pcrc,this.initialDateParam, this.finalDateParam,this.usuarios, this.selectedCategory.id)
        .pipe(first())
        .subscribe(
          (data:any) => {
            this.totalpage = data.total_obligatorio;
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

  getverify(data){

    if((([].concat.apply({}, data).length)-1)===0){
      this.verificar=false;
   }else{
     this.verificar=true;
   }
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


   if(!this.textClient){
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

  if(this.usuarios == 0){ 

    this.tableIsLoading=false
    
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Escoge una opcion en Usuarios Lectura '
    })

  }

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
  
  }

  getFilters() {

    this.tableIsLoading=true
    
   this.elem.nativeElement.querySelector('.btn-primary').classList.add('show')
   this.elem.nativeElement.querySelector('.btn-primary2').classList.add('show')

    let filter1: { filter: posibleFilterFields, value: string }

    if (!!this.selectedCliente && this.selectedCliente.cliente != 'Cualquiera') {
      filter1 = { value: this.selectedCliente.id_dp_clientes.toString(), filter: 'cliente' }

      if (!!this.selectedPcrc && this.selectedPcrc.pcrc != 'Cualquiera') {
        filter1 = { value: this.selectedPcrc.id_dp_pcrc.toString(), filter: 'pcrc' }

    

        if(this.selectedCategory==null){

          let data=this.reportsApi.getObligatorioPcrc(this.selectedPcrc.id_dp_pcrc,this.initialDateParam,this.finalDateParam,this.usuarios,this.page);
          data.subscribe(
              (data:any)=>{
                console.log(data)
                this.data = data
                this.lectura=this.usuarios
                this.getverify(data)
                this.tableIsLoading=false
              }
            ) 
        }

        if (!!this.selectedCategory && this.selectedCategory.name != 'Cualquiera') {
          filter1 = { value: this.selectedCategory.id, filter: 'categoria' }
          
          if(this.selectedArticle==null){
  
            let data=this.reportsApi.getObligatorioCategoria(this.selectedCategory.id,this.initialDateParam,this.finalDateParam,this.usuarios,this.page,this.selectedPcrc.id_dp_pcrc);
            data.subscribe(
              (data:any)=> {
                 
                 this.data= data
                 this.lectura=this.usuarios
                 this.getverify(data)
                 this.tableIsLoading=false
               }
              ) 
          }

          
        }

      }
    }

   
  }

 limpiar(){
  this.router.navigate(['/app/redirect/obligatorio'])
 }


  formatearValor(valor:any){
    return isNaN(valor) ? valor : parseFloat(valor).toFixed();
  }

  preview(){
    this.page--
    this.validarpaginaspcrc()

    if(this.selectedCategory==null){

          let data=this.reportsApi.getObligatorioPcrc(this.selectedPcrc.id_dp_pcrc,this.initialDateParam,this.finalDateParam,this.usuarios,this.page);
          data.subscribe(
              (data:any)=>{
                console.log(data)
                this.data = data
                this.lectura=this.usuarios
                this.getverify(data)
                this.tableIsLoading=false
              }
            ) 
        }

        if (!!this.selectedCategory && this.selectedCategory.name != 'Cualquiera') {
          
          if(this.selectedArticle==null){

            let data=this.reportsApi.getObligatorioCategoria(this.selectedCategory.id,this.initialDateParam,this.finalDateParam,this.usuarios,this.page,this.selectedPcrc.id_dp_pcrc);
            data.subscribe(
              (data:any)=> {
                 
                 this.data= data
                 this.lectura=this.usuarios
                 this.getverify(data)
                 this.tableIsLoading=false
               }
              ) 
          }

          
        }
     

 }

 next(){
  this.page++
  this.validarpaginaspcrc()

  if(this.selectedCategory==null){

    let data=this.reportsApi.getObligatorioPcrc(this.selectedPcrc.id_dp_pcrc,this.initialDateParam,this.finalDateParam,this.usuarios,this.page);
    data.subscribe(
        (data:any)=>{
          console.log(data)
          this.data = data
          this.lectura=this.usuarios
          this.getverify(data)
          this.tableIsLoading=false
        }
      ) 
  }

  if (!!this.selectedCategory && this.selectedCategory.name != 'Cualquiera') {
    
    if(this.selectedArticle==null){

      let data=this.reportsApi.getObligatorioCategoria(this.selectedCategory.id,this.initialDateParam,this.finalDateParam,this.usuarios,this.page,this.selectedPcrc.id_dp_pcrc);
      data.subscribe(
        (data:any)=> {
           
           this.data= data
           this.lectura=this.usuarios
           this.getverify(data)
           this.tableIsLoading=false
         }
        ) 
    }

    
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

  this.reportsApi.getReportObligatorioPcrc(this.initialDateParam, this.finalDateParam, this.selectedPcrc.id_dp_pcrc,this.pagexportar,this.usuarios)
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

    this.reportsApi.getReportObligatorioCategoria(this.initialDateParam, this.finalDateParam, this.selectedPcrc.id_dp_pcrc,this.pagexportar,this.usuarios,this.selectedCategory.id)
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