import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-reporte-preturno',
  templateUrl: './reporte-preturno.component.html',
  styleUrls: ['./reporte-preturno.component.css']
})
export class ReportePreturnoComponent implements OnInit {
  public isPcrcActive = false
  @ViewChild('table',{ static:false }) table:ElementRef

  cargando = false
  clientesList: cliente[]
  pcrcList: cliente['pcrcs'][0][]
 

  
  p:number = 1
  selectedCliente: cliente
  selectedPcrc: cliente['pcrcs'][0]

page=1
finalDateDrop
initialDateDrop
  initialDate:Date
  finalDate:Date
  initialDateHumanRead = ''
  finalDateHumanRead = ''
  initialDateParam=''
  finalDateParam=''
  buscar =""
  data:any;
  verificar:boolean;
  tableIsLoading = false;
   textClient=""
   textPcrc=""
   lectura=0
   results = []
   totalpage
   numeroexportar=[]
   atras=false
   siguiente=false
   pagexportar
   generando = false

  constructor(
    public state: StateService,
    public pcrcApi: PcrcApiService,
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

    this.selectedPcrc = null

  }

  pcrcSelected(event: cliente['pcrcs'][0]) {
    this.selectedPcrc = event
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
      this.reportsApi.getPreturnoTotal(this.selectedPcrc.id_dp_pcrc,this.initialDateParam, this.finalDateParam)
        .pipe(first())
        .subscribe(
          (data:any) => {
        
            this.totalpage = data.total_preturno;
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

    this.page=1
    this.numeroexportar=[]

    if (!!this.selectedPcrc && this.selectedPcrc.pcrc != 'Cualquiera') {

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

                this.reportsApi.getPreturno(this.selectedPcrc.id_dp_pcrc,this.initialDateParam,this.finalDateParam,this.page)
                .subscribe((datos:any)=>{
                 this.lectura=1
                  this.data=datos
                   this.results= [datos]

                      this.tableIsLoading=false
                      this.verificar=true;
                    
                  })
                
              
      }
    }

   
  }

  limpiar(){
    this.router.navigate(['/app/redirect/preturno'])
  }

  formatearValor(valor:any){
    return isNaN(valor) ? valor : parseFloat(valor).toFixed();
  }

  preview(){
    this.page--
    this.validarpaginaspcrc()

    if (!!this.selectedPcrc && this.selectedPcrc.pcrc != 'Cualquiera') {

              console.log(this.selectedPcrc.id_dp_pcrc,this.initialDateParam,this.finalDateParam)

              this.reportsApi.getPreturno(this.selectedPcrc.id_dp_pcrc,this.initialDateParam,this.finalDateParam,this.page)
              .subscribe((datos:any)=>{
               this.lectura=1
                this.data=datos
                 this.results= [datos]

                    this.tableIsLoading=false
                    this.verificar=true;
                  
                })
              
            
    }
     

 }

 next(){
  this.page++
  this.validarpaginaspcrc()

  if (!!this.selectedPcrc && this.selectedPcrc.pcrc != 'Cualquiera') {

            

            this.reportsApi.getPreturno(this.selectedPcrc.id_dp_pcrc,this.initialDateParam,this.finalDateParam,this.page)
            .subscribe((datos:any)=>{
             this.lectura=1
              this.data=datos
               this.results= [datos]

                  this.tableIsLoading=false
                  this.verificar=true;
                
              })
            
          
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

  if (!!this.selectedPcrc && this.selectedPcrc.pcrc != 'Cualquiera') {
console.log(this.initialDateParam, this.finalDateParam, this.selectedPcrc.id_dp_pcrc,this.pagexportar)
  this.reportsApi.getReportPreturnoPcrc(this.initialDateParam, this.finalDateParam, this.selectedPcrc.id_dp_pcrc,this.pagexportar)
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

   }

   

}
 