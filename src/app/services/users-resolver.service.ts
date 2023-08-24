import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserApiService, user } from "../api/user-api.service";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<user[]> {

  constructor(private userApi:UserApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<user[]>{
    return this.userApi.getUsers().pipe(
      take(1)
    )
  }
}
