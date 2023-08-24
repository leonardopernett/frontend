import { Injectable } from '@angular/core';
import * as Filesaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExportExcelService {

    constructor() { }

    exportexcel(data:HTMLElement){
        
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

        const wb: XLSX.WorkBook = XLSX.utils.book_new()

          XLSX.utils.book_append_sheet(wb,ws, 'sheet1')
         
         XLSX.writeFile(wb, 'ExcelSheet.xlsx');

    } 



}
