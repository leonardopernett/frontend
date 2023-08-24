import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export type cliente = {
    id_dp_clientes: number;
    cliente: string;
    pcrcs?: {
        id_dp_pcrc: number;
        pcrc: string;
        cod_pcrc: string;
    }[]
}

export type search = {
    subline: string;
    query: string;
    searches: number;
    id: string;
}

@Injectable({
    providedIn: 'root'
})
export class PcrcApiService {

    constructor(private http: HttpClient) { }

    private endPoints = {
        getAllPcrc: `${environment.endpoint}/api/pcrc`,
        setUserPcrc: (cedula: string) => `${environment.endpoint}/api/auth/asignar/${cedula}`,
        getUserPcrc: (cedula: string) => `${environment.endpoint}/api/users/${cedula}/pcrc`,
        postUserPcrc: (cedula: string) => `${environment.endpoint}/api/users/${cedula}/pcrc`,
        getSuggestions: (idPcrc: string) => `${environment.endpoint}/api/pcrc/${idPcrc}/suggestions`,
        permisoCopiado: (idPcrc: string) => `${environment.endpoint}/api/pcrc/${idPcrc}/canCopy`,
    }

    setUserPcrc = (cedula: string) => {
        console.log(cedula)
        return this.http.get(this.endPoints.setUserPcrc(cedula), { observe: "body" })
    }

    getUserPcrc = (cedula: string, from: number = 0, size: number = 10) => {
         return this.http.get<cliente[]>(this.endPoints.getUserPcrc(cedula), { params: { from: from.toString(), size: size.toString() }, observe: "body" })
    }

    getAllPcrc = () => {
        return this.http.get<cliente[]>(this.endPoints.getAllPcrc, { observe: "body" })
    }

    getSuggestions = (idPcrc: string, input: string) => {
        return this.http.get<string[]>(this.endPoints.getSuggestions(idPcrc), { params: { input }, observe: "body" })
    }

    getPermisoCopiado = (idPcrc: string) => {
        return this.http.get<{base_id: string, puede_copiar: boolean}>(this.endPoints.permisoCopiado(idPcrc), { observe: "body" })
    }

    putPermisoCopiado = (idPcrc: string) => {
        return this.http.put<{base_id: string, puede_copiar: boolean}>(this.endPoints.permisoCopiado(idPcrc), { observe: "body" })
    }

    saveBases(base){

        let params = {
            base:base
        }
       
        return this.http.post(`${environment.endpoint}/api/pcrc/savebase`,params);

    }

    savePcrc(pcrc,base_id){

        let params = {
            pcrc:pcrc,
            base_id:base_id
        }
      
        return this.http.post(`${environment.endpoint}/api/pcrc/savepcrc`,params);

    }

    getBases(){

       return this.http.get(`${environment.endpoint}/api/pcrc/viewbase`); 

    }

    getPcrc(idbase){

        return this.http.get(`${environment.endpoint}/api/pcrc/viewpcrc/${idbase}`)
    }

    deleteBases(idbase){

        return this.http.delete(`${environment.endpoint}/api/pcrc/deletebase/${idbase}`)

    }

    deletePcrc(idpcrc){

        return this.http.delete(`${environment.endpoint}/api/pcrc/deletepcrc/${idpcrc}`)

    }

    updateBases(idbase,base){

        let params = {
            idbase:idbase,
            base:base
        }

        return this.http.put(`${environment.endpoint}/api/pcrc/updatebase`,params)

    }


    updatePcrc(idpcrc,pcrc,base_id){

        let params = {
            idpcrc:idpcrc,
            pcrc:pcrc,
            base_id:base_id
        }

        return this.http.put(`${environment.endpoint}/api/pcrc/updatepcrc`,params)

    }

    

}