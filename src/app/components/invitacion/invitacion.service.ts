import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import * as XLSX from 'xlsx'
import * as FILESAVER from 'file-saver'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class InvitacionService {

    constructor(private http: HttpClient) {  }
  
    getusers(){
        return this.http.get(`${environment.endpoint}/api/externo`);
    }

    deleteuser(id:number){
        return this.http.delete(`${environment.endpoint}/api/externo/deleteuser/`+id);
    }

    enviarcorreo(data){
        return this.http.post(`${environment.endpoint}/api/externo/mail`,data);
    }



    createExcel(json:any[]){
     const ws : XLSX.WorkSheet =  XLSX.utils.json_to_sheet(json);
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     return XLSX.writeFile(wb, 'usuarios.xlsx');
    }


}