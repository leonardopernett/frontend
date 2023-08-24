import { Component, OnInit} from '@angular/core';
import { ZendeskApiService } from '../../api/zendesk-api.service';
import { PcrcApiService, cliente } from '../../api/pcrc-api.service';
import { StateService } from '../../services/state.service';
import { tap, elementAt } from 'rxjs/operators';
import { CategoriesApiService } from '../../api/categories-api.service';

@Component({
  selector: 'app-zendesk',
  templateUrl: './zendesk.component.html',
  styleUrls: ['./zendesk.component.css']
})
export class zendeskComponent implements OnInit {
  cargando:boolean = false
  articulos
  id
  clientesList: any=[]
  pcrcList:any=[]
  categoriaList:any[]
  idpcrc
  idcategoria
  idcliente
  filter=""
  pcrc= false
  optionsSelect ={
    placeholder: "Select option...",
    allowClear: true,
    width: "100%"
  }
  listClient=[]

 categoria = false
  constructor( 
    public zendesk:ZendeskApiService,
    public pcrcApi: PcrcApiService,
    public state: StateService,
    public categoriesApi: CategoriesApiService
  ) {  }

  ngOnInit(){
   
    this.cargardatos();
   
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

  obtenerid(id){
    this.id=id
    this.cargarpcrc();
  }

  guardardatos(){

    const articulo={
        id:this.id,
        idcliente:this.idcliente,
        idpcrc:this.idpcrc,
        idcategoria:this.idcategoria
    }

    this.zendesk.changesArticles(articulo).subscribe(data=>{
      this.cargardatos()
    })

  }

  cargardatos(){
     this.cargando = true
    let data=this.zendesk.getArticles();
    data.subscribe((data:any)=>{
      this.articulos=data
    this.cargando= false
    })

  }

}
