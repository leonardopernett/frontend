import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PcrcApiService } from "../api/pcrc-api.service";
import { StateService } from "../services/state.service";

@Injectable({
  providedIn: 'root'
})
export class PreloadPcrcGuard implements CanActivate {

  constructor(
    private state:StateService,    
    private pcrcApi:PcrcApiService
  ){  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!!this.state.getValueOf('user')){

      return this.pcrcApi.getUserPcrc(this.state.getValueOf('user').sub, 0, 1000).pipe(
        tap(clientes => {
          console.log('preload pcrc con user')
          if (clientes.length) {
  
            let selectedClienteId = localStorage.getItem('selectedClienteId')
  
            let selectedPcrcId = localStorage.getItem('selectedPcrcId')
  
            this.state.newUserPcrc(clientes)
  
            if (selectedClienteId != null && selectedPcrcId != null) {
  
              let cliente = clientes.find(cliente => cliente.id_dp_clientes.toString() == selectedClienteId)
  
              this.state.newSelectedCliente(cliente)
  
              this.state.newSelectedPcrc(cliente.pcrcs.find(pcrc => pcrc.id_dp_pcrc.toString() == selectedPcrcId))
  
            } else {
  
              this.state.newSelectedCliente(clientes[0])
  
              this.state.newSelectedPcrc(clientes[0].pcrcs[0])
  
            }
          } else {
  
            localStorage.removeItem('selectedClienteId')
  
            localStorage.removeItem('selectedPcrcId')
  
          }
        }),
        map(pcrcs => true)
      )
      
    } else {
      console.log('preload pcrc sin user')
      return of(true)
    }
  }
}