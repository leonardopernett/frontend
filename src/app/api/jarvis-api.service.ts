import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type personData = {
    cedula:string;
    nombre:string;
}

@Injectable({
    providedIn: 'root'
})
export class JarvisApiService {

    constructor(private http: HttpClient) {  }

    private endPoints = {
        getDirectorClients: (directorId: string) => `${environment.endpoint}/api/directores/${directorId}/clients`,
        getClientDirectores: (clienteId: string) => `${environment.endpoint}/api/clientes/${clienteId}/directors`,
        getDirectorGerentes: (directorId: string) => `${environment.endpoint}/api/directores/${directorId}/gerentes`,
        getGerenteCoordis: (gerenteId: string) => `${environment.endpoint}/api/gerentes/${gerenteId}/coordis`,
        getCoordinadorLideres: (coordiId: string) => `${environment.endpoint}/api/coordinadores/${coordiId}/lideres`
    }
    
    getClientDirectores( clientId:string ):Observable<personData[]>{
        return this.http.get<personData[]>(this.endPoints.getClientDirectores(clientId), { observe: "body" })
    }

    getDirectorGerentes(directorId:string):Observable<personData[]>{
        return this.http.get<personData[]>(this.endPoints.getDirectorGerentes(directorId), { observe: "body" })
    }

    getGerenteCoordis(gerenteId:string):Observable<personData[]>{
        return this.http.get<personData[]>(this.endPoints.getGerenteCoordis(gerenteId), { observe: "body" })
    }

    getCoordiLideres(coordinadorId:string):Observable<personData[]>{
        return this.http.get<personData[]>(this.endPoints.getCoordinadorLideres(coordinadorId), { observe: "body" })
    }

}