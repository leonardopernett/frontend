import { Component, OnInit} from '@angular/core';
import { PcrcApiService } from 'src/app/api/pcrc-api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.css']
})
export class basesComponent implements OnInit {

  idclientepcrc
  bases:any
  base=""
  baseB=""
  pcrcB=""
  pcrc
  pcrcedit
  pcrcsave:any=""
  pcrcs
  pcrcactive=false
  editaractive=true
  idcliente:any
  idpcrc:any
  editaractivepcrc=true
  pcrcNombre=""
  
  constructor( 
    public pcrcApi: PcrcApiService
  ) {  }

  ngOnInit(){

    this.cargardatos();
   
  }

  buscarbase(){
    this.baseB=this.base
  }

  buscarpcrc(){
    this.pcrcB=this.pcrcsave
  }

  cargardatospcrc(baseid,pcrcN){

    this.pcrcNombre=pcrcN
    this.pcrcactive=true;
    this.idclientepcrc=baseid
    
    this.pcrcApi.getPcrc(baseid).subscribe(data=>{
      this.pcrcs=data[0]
    })

  }

  async crearbase(){

    if(this.base===undefined || this.base===""){
       return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor llena el campo vacio',
      })
    }

   this.pcrcApi.saveBases(this.base).subscribe(data=>{
    this.cargardatos();
    this.base=""
    Swal.fire({
      icon:'success',
      title: 'Guardada con exito',
      showConfirmButton: false,
      timer: 1500
  })
   })

  }

  eliminarbase(baseid){

    Swal.fire({ 
      title: 'Estas seguro ?', 
      text: "Esta opcion no tiene reversa!", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText:'Cancelar', 
    }).then((result) => { 
      if (result.isConfirmed) { 
       
        this.pcrcApi.deleteBases(baseid).subscribe(data=>{
          this.cargardatos();
          this.pcrcactive=false;
          Swal.fire({
            icon:'success',
            title: 'Eliminada con exito',
            showConfirmButton: false,
            timer: 1500
        })
        })
        
      } 
    })
    
    
  }

  cargardatos(){
   
    this.pcrcApi.getBases().subscribe(data=>{
      this.bases=data
    })

  }

  editar(idcliente,pcrc){
    this.idcliente=idcliente
    this.editaractive=false
    this.pcrc=pcrc
  }

  editarpcrc(idpcrc,pcrc){
    this.idpcrc=idpcrc
    this.editaractivepcrc=false
    this.pcrcedit=pcrc
  }

  cancelar(){
    this.editaractive=true;
    this.idcliente=""
  }

  cancelarpcrc(){
    this.editaractivepcrc=true;
    this.idpcrc=""
  }

  confirmar(idpcrc){

    if(this.pcrc===""){
      return Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Por favor llena el campo vacio',
     })
   }
   
    this.pcrcApi.updateBases(idpcrc,this.pcrc).subscribe(data=>{
      this.editaractive=true;
      this.idcliente=""
      this.cargardatos();
      Swal.fire({
        icon:'success',
        title: 'Editada con exito',
        showConfirmButton: false,
        timer: 1500
    })
    })
  }

  confirmareditar(idpcrc){

    if(this.pcrcedit===""){
      return Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Por favor llena el campo vacio',
     })
   }
    
    this.pcrcApi.updatePcrc(idpcrc,this.pcrcedit,this.idclientepcrc).subscribe(data=>{
      this.editaractivepcrc=true;
      this.idpcrc=""
      this.cargardatospcrc(this.idclientepcrc,"");
      Swal.fire({
        icon:'success',
        title: 'Editado con exito',
        showConfirmButton: false,
        timer: 1500
    })
    })

  }

  crearpcrc(){

    if(this.pcrcsave===undefined || this.pcrcsave===""){
      return Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Por favor llena el campo vacio',
     })
   }
    
    this.pcrcApi.savePcrc(this.pcrcsave,this.idclientepcrc).subscribe(data=>{
      this.cargardatospcrc(this.idclientepcrc,"")
      this.pcrcsave=""
      Swal.fire({
        icon:'success',
        title: 'Guardado con exito',
        showConfirmButton: false,
        timer: 1500
    })
    })
  }

  eliminarpcrc(idpcrc){

    Swal.fire({ 
      title: 'Estas seguro ?', 
      text: "Esta opcion no tiene reversa!", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText:'Cancelar', 
    }).then((result) => { 
      if (result.isConfirmed) { 
       
        this.pcrcApi.deletePcrc(idpcrc).subscribe(data=>{
          this.cargardatospcrc(this.idclientepcrc,"")
          Swal.fire({
            icon:'success',
            title: 'Eliminado con exito',
            showConfirmButton: false,
            timer: 1500
        })
        })
        
      } 
    })


  }


}
