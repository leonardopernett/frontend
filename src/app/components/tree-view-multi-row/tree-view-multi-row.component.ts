import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { StateService } from "../../services/state.service";
import { cliente, PcrcApiService } from "../../api/pcrc-api.service";
import { UserApiService } from "../../api/user-api.service";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tree-view-multi-row',
  templateUrl: './tree-view-multi-row.component.html',
  styleUrls: ['./tree-view-multi-row.component.css']
})
export class TreeViewMultiRowComponent implements OnInit {

  @Input() clienteData:{
    allPcrc:cliente[],
    userPcrc:cliente[],
    selectedUserPcrcs:cliente[]
  }

  @Input() cliente:cliente;

  public isDesplegado = false;

  constructor(
    public state:StateService,
    public userApi:UserApiService
  ){  }
  
 
  ngOnInit() { 
  
      
    /*  console.log(this.cliente) */ 

   }

  pcrcSeleccionado(pcrc:cliente['pcrcs'][0]){
    
    if(!this.pcrcBloqueado(pcrc.id_dp_pcrc.toString())){
      if(this.pcrcHabilitado( pcrc.id_dp_pcrc.toString())){
        this.deleteUserPcrc(pcrc)
      } else {
        this.postUserPcrc(pcrc)
      }
    }
  }

  deleteUserPcrc = (pcrc:cliente['pcrcs'][0]) => {
    this.userApi.deleteUserPcrc(this.state.getSelectedUser().cedula, pcrc.id_dp_pcrc.toString()).pipe(
      tap(result => {
        
        let clientIndex = this.clienteData.selectedUserPcrcs.findIndex(cliente => cliente.id_dp_clientes == this.cliente.id_dp_clientes)
        let pcrcIndex = this.clienteData.selectedUserPcrcs[clientIndex].pcrcs.findIndex(({id_dp_pcrc}) => id_dp_pcrc == pcrc.id_dp_pcrc)
        this.clienteData.selectedUserPcrcs[clientIndex].pcrcs.splice(pcrcIndex,1)
        if(this.clienteData.selectedUserPcrcs[clientIndex].pcrcs.length == 0){
          this.clienteData.selectedUserPcrcs.splice(clientIndex,1)
        }


      })
    ).subscribe()
  }

  postUserPcrc = (pcrc:cliente['pcrcs'][0]) => {
    this.userApi.postUserPcrc( this.state.getSelectedUser().cedula, pcrc.id_dp_pcrc.toString()).pipe(
      tap(result => {

        let indiceCliente = this.clienteData.selectedUserPcrcs.findIndex(cliente => cliente.id_dp_clientes == this.cliente.id_dp_clientes )

        if( indiceCliente > -1 ) {
          if(!this.clienteData.selectedUserPcrcs[indiceCliente].pcrcs.find(({id_dp_pcrc}) => pcrc.id_dp_pcrc == id_dp_pcrc)){
            this.clienteData.selectedUserPcrcs[indiceCliente].pcrcs.push(pcrc)
          }
        } else {
          let newCliente = { ...this.cliente }
          newCliente.pcrcs = [ pcrc ]
          this.clienteData.selectedUserPcrcs.push( newCliente )
        }

      })
    ).subscribe()
  }

  clienteBloqueado = () => !!!this.clienteData.userPcrc.find(cliente => cliente.id_dp_clientes == this.cliente.id_dp_clientes)
  
  pcrcBloqueado = (idPcrc:string) => {
    if(this.clienteBloqueado()){
      return true
    } else {
      let clienteAux = this.clienteData.userPcrc.find(cliente => cliente.id_dp_clientes == this.cliente.id_dp_clientes)
      return !!!clienteAux.pcrcs.find(pcrc => pcrc.id_dp_pcrc.toString() == idPcrc.toString())
    }
  }

  pcrcHabilitado = (idPcrc:string) => {
    if(!this.clienteHabilitado()){
      return false
    } else {
      let clienteAux = this.clienteData.selectedUserPcrcs.find(cliente => cliente.id_dp_clientes == this.cliente.id_dp_clientes)
      return !!clienteAux.pcrcs.find(pcrc => pcrc.id_dp_pcrc.toString() == idPcrc.toString())
    }
  }

  clienteHabilitado = () =>{
    return !!this.clienteData.selectedUserPcrcs.find(cliente => cliente.id_dp_clientes == this.cliente.id_dp_clientes)
  }

}