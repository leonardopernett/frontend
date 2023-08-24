import { Component, ElementRef} from '@angular/core';
import format from 'date-fns/format';
import { ReportsApiService } from 'src/app/api/reports-api.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-reporte-cantidad-articulo',
  templateUrl: './reporte-cantidad-articulo.component.html',
  styleUrls: ['./reporte-cantidad-articulo.component.css']
})
export class ReporteCantidadArticuloComponent  {
 
  datos:any=[];
  verificar:boolean;
  tableIsLoading = false;
  loading:boolean= false
  initialDate:Date
  finalDate:Date
  initialDateHumanRead = ''
  finalDateHumanRead = ''
  initialDateParam=''
  finalDateParam=''
  date=''
   p:number = 1
  
  constructor(
    public elem: ElementRef,
    private apireport:ReportsApiService,
    public router:Router
  ) { }
  
 
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
    this.date=(this.finalDate.getFullYear()+"/"+(this.finalDate.getMonth()+1)+"/"+(this.finalDate.getDate()+1))
   
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
    this.router.navigate(['/app/redirect/totalarticulo'])
  }
  
  buscar(){
    this.loading= true 
    this.apireport.getTotalArticulos().subscribe(data=>{
      this.loading= false 
      this.datos=data,
      this.elem.nativeElement.querySelector('table').classList.add('show'),
      this.elem.nativeElement.querySelector('.paginacion').classList.add('show')
      this.getverify(data),
      this.tableIsLoading=false
    });
  }


  exportExcel(){
    const ws:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.datos)
    const wb:XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,ws, 'Sheet1')

    XLSX.writeFile(wb, 'ArticuloTotal.xlsx')
  }

 
}
 