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
export class HomeGuard implements CanActivate {
  constructor(
    private router:Router,
    private pcrcApi: PcrcApiService,
    private autenticateApi: AutenticateApiService,
    private state: StateService,
  ){  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!!this.state.getValueOf('user')) {
        this.router.navigate(['/app'])
      } else {
        return this.autenticateApi.refreshToken().pipe(
        
        catchError(err => of(null)),
        mergeMap(apiRes => iif(() => !!apiRes,
          of(apiRes).pipe(
            tap(tokens => {
              let decoded = helper.decodeToken(tokens.token)

              this.state.setToken(tokens.token)

              this.state.setUser({ name: decoded.name, rol: decoded.rol, sub: decoded.sub , permiso:decoded.permiso})

              this.autenticateApi.startSilentRefresh(tokens.token)
            }),
            tap(value => this.router.navigate(['/app'])),
            map(pcrcs => false)
          )
          ,
          of(true)
          )
        )
      )
          }
  }
  
}
