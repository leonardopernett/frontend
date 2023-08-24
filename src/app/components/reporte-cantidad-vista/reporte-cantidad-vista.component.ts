import { Component, OnInit, ElementRef} from '@angular/core';
import format from 'date-fns/format';
import { ReportsApiService } from 'src/app/api/reports-api.service';
import { Router } from '@angular/router';
import { error } from 'jquery';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'
import { Xliff } from '@angular/compiler';
@Component({
  selector: 'app-reporte-cantidad-vista',
  templateUrl: './reporte-cantidad-vista.component.html',
  styleUrls: ['./reporte-cantidad-vista.component.css']
})

export class ReporteCantidadVistaComponent implements OnInit { 
  page=1
  datos:any=[];
  datos2:any=[]
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
  initialDateDrop:boolean;
  finalDateDrop:boolean
  
  constructor(
    public elem: ElementRef,
    private apireport:ReportsApiService,
    public router:Router
  ) { }
  
  ngOnInit() {
   
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

  getverify(data){

    if((([].concat.apply({}, data).length)-1)===0){
      this.verificar=false;
   }else{
     this.verificar=true;
   }
  }

  limpiar()
  {
    this.router.navigate(['/app/redirect/totalvista'])
  }
  
  buscar(){
  if(this.initialDateParam=="" || this.finalDateParam==""){
    return Swal.fire({
      text:"los campos fechas son requeridos",
      icon:"error",
      title:"Oops..."
    })
  }
  this.loading= true 
    this.apireport.getTotalVista(this.initialDateParam,this.finalDateParam).subscribe(data=>{
      this.loading= false
      this.datos=data,
      this.elem.nativeElement.querySelector('table').classList.add('show'),
      this.getverify(data),
      this.tableIsLoading=false
    },
    erro=>console.log(erro)
    );

    this.apireport.getTotalVistaLImit(this.initialDateParam,this.finalDateParam, this.page).subscribe(data=>{
      this.loading= false
      this.datos2=data,
      this.elem.nativeElement.querySelector('table').classList.add('show'),
      this.getverify(data),
      this.tableIsLoading=false
    },
    erro=>console.log(erro)
    );
  }


  preview(){
     if(this.page==1){
       return 
     }
      this.page --
      this.apireport.getTotalVistaLImit(this.initialDateParam,this.finalDateParam, this.page).subscribe(data=>{
        this.loading= false
        this.datos2=data,
        this.elem.nativeElement.querySelector('table').classList.add('show'),
        this.getverify(data),
        this.tableIsLoading=false
      },
      erro=>console.log(erro)
      );
  }

  next(){
    this.page ++
    this.apireport.getTotalVistaLImit(this.initialDateParam,this.finalDateParam, this.page).subscribe(data=>{
      this.loading= false
      this.datos2=data,
      this.elem.nativeElement.querySelector('table').classList.add('show'),
      this.getverify(data),
      this.tableIsLoading=false
    },
    erro=>console.log(erro)
    );
  }

  exportExcel(){
  
     const ws:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.datos)
     const wb:XLSX.WorkBook = XLSX.utils.book_new()

     XLSX.utils.book_append_sheet(wb, ws, 'sheet1')
     XLSX.writeFile(wb, 'TotalVista.xlsx')
  }
}
