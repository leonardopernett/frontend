import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of, iif } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StateService } from "../services/state.service";
import { AutenticateApiService } from "../api/autenticate-api.service";
import { map, tap, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { PcrcApiService } from "../api/pcrc-api.service";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private state: StateService,
    private autenticateApi: AutenticateApiService,
    private pcrcApi: PcrcApiService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (!!this.state.getValueOf('user')) {

      
     
      let token = this.state.getValueOf('rawtoken')
      this.autenticateApi.startSilentRefresh(token)

      if(this.state.getValueOf('selectedPcrc') == null){

         return this.pcrcApi.getUserPcrc(this.state.getValueOf('user').sub, 0, 1000).pipe(
          tap(clientes => {
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
        return true
      }
    } else {
      return this.autenticateApi.refreshToken().pipe(
        catchError(err => of(null)),
        mergeMap(apiRes => iif(() => !!apiRes,
          of(apiRes).pipe(
            tap(tokens => {
              let decoded = helper.decodeToken(tokens.token)

              this.state.setToken(tokens.token)

              this.state.setUser({ name: decoded.name, rol: decoded.rol, sub: decoded.sub, permiso:decoded.permiso })

              this.autenticateApi.startSilentRefresh(tokens.token)
            }),
            switchMap(tokens => this.pcrcApi.getUserPcrc(this.state.getValueOf('user').sub, 0, 1000)),
            tap(clientes => {

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
          ,
          of(false).pipe(tap(value => this.router.navigate(['/login'])))
          )
        )
      )
    }
  }
}