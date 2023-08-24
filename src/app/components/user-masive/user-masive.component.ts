import { OnInit, Component } from '@angular/core'
import Swal from 'sweetalert2'
import { RepositorioApiService } from '../../api/repositorio-api.service';
import { ArticlesApiService } from '../../api/articles-api.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-user-masive',
  templateUrl: './user-masive.component.html',
  styleUrls: ['./user-masive.component.css']
})
export class UserMasiveComponent implements OnInit {

  constructor(
    private repositoryService:RepositorioApiService,
    private articlesApi:ArticlesApiService,
    private translate:TranslateService
    
  ) { }

  
  public clientes;
  public clientesD;
  public clientList = "Selected";
  public clientListD = "Selected";
  public pcrc: any[];
  public pcrcOrigen;
  public pcrcD: any[];
  public pcrcDestino;
  public permisos = [];
  public destino

  ngOnInit() {
    this.listarClientes();
  }

  listarClientes(){
    this.articlesApi.getCliente().subscribe((cliente) =>{
      this.clientes = cliente;
      this.clientesD = cliente;
    });
    }

    mostrarpcrc(){
       this.obtenerPcrcs();
    }

    mostrarpcrcD(){
      this.obtenerPcrcsD();
   }

    obtenerPcrcsD(){

      if(this.clientListD==null){
        return
      }
      
      this.articlesApi.getPcrc([this.clientListD]).subscribe((data:any)=>{
      
        this.pcrcD=data.map(item=>{
          return {
            id:item.id_dp_pcrc,
            text:item.pcrc+" "+item.cod_pcrc,
            cod: item.cod_pcrc
          }
        })
      })
  
     
  
    }
  
    obtenerPcrcs(){

      if(this.clientList==null){
        return
      }
     
      this.articlesApi.getPcrc([this.clientList]).subscribe((data:any)=>{
      
        this.pcrc=data.map(item=>{
          return {
            id:item.id_dp_pcrc,
            text:item.pcrc+" "+item.cod_pcrc,
            cod: item.cod_pcrc
          }
        })
      })
  
     
  
    }

    getMultipleUser(){
      
      this.repositoryService.getMultipleUsers(this.pcrcOrigen).subscribe( (data) => {
        this.destino=data
      })
    }

   agregarDestino(){

    console.log(this.pcrcOrigen,this.pcrcDestino)
    this.repositoryService.guardarPermisosAutomatizados(this.pcrcOrigen,this.pcrcDestino).subscribe(data=>{

      this.getMultipleUser()

       Swal.fire(
    this.translate.instant('Excelente'),
    this.translate.instant('Se ha guardado la automatizacion'),
    'success'
  )

    })

   }

   quitarautomatizado(id){

    this.repositoryService.eliminarPermisosAutomatizados(id).subscribe(data=>{

      this.getMultipleUser()

      Swal.fire(
        this.translate.instant('Borrado'),
        this.translate.instant('Se ha borrado la automatizacion'),
        'error'
      )

      })
    
    }

}
