import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take, tap } from 'rxjs/operators';
import { ReportsApiService } from 'src/app/api/reports-api.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-reporte-consolidado',
  templateUrl: './reporte-consolidado.component.html',
  styleUrls: ['./reporte-consolidado.component.css']
})
export class ReporteConsolidadoComponent implements OnInit {

  @ViewChild('inicial',{static:false}) inicial:ElementRef
  @ViewChild('final',{static:false}) final:ElementRef
  @ViewChild('table',{static:false}) table:ElementRef
  filterSearch:string = ""
  limit:number = 5;
  page:number = 1
  data:Array<any[]>=[]
  incialMoth
  finalMonth
  url:string=""
  verificar: boolean;
  generando = false
  pagexportar=1

  constructor(
   @Inject(DOCUMENT) private document:Document,
   private reportApiService: ReportsApiService,
   private render:Renderer2,
   private translate:TranslateService,
   private reportsApi: ReportsApiService
  ) { }

  
  loading:boolean = false
  text:string=""
  p:number=1
  cargando= false

  ngOnInit() {}

  search(){
     this.incialMoth = this.inicial.nativeElement.value + '-01'
     this.finalMonth = this.final.nativeElement.value + '-01' 

    if(this.inicial.nativeElement.value === "" &&  this.final.nativeElement.value === ""){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:this.translate.instant('los campos fechas son requeridos')
        })
       return
    }

    this.loading = true
    this.verificar=true
    this.loading=false

  }

  limpiar(){
      this.inicial.nativeElement.value = ""
      this.final.nativeElement.value = ""
      this.render.removeClass(this.table.nativeElement, 'show')
      this.render.addClass(this.table.nativeElement, 'hide')
  }

  sendData(){
  
    this.generando = true
  
      this.reportsApi.getReportFinanciera( this.incialMoth,this.finalMonth)
      .subscribe(
        response => {
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const file = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = file;
          a.download = 'reporte_financiera.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this.generando = false
        }
      )
    
      
  
     }
  

}
