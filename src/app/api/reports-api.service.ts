import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { environment } from '../../environments/environment'

export type posibleEvents = 'view'|'fav'|'like'|'dislike'|'lecture'|'comment'
export type posibleItems = 'articles' | 'favorite' | 'like' | 'dislike'
export type posibleFilterFields = 'categoria'|'pcrc'|'cliente'|'articulo'|'director'|'coordinador'|'gerente'|'lider'

export type report = {
    totalItems:number,
    items:{
        articleId:string,
        title:string,
        views:number,    
        likes:number,
        dislikes:number,
        indiceDisgusto:number,
        indiceGusto:number,
        favoritos:number,
        favoritismo:string,
        comments:number,
        indiceUso:string,
        lecturabilidad:string
    }[]
}

export type commentsReport = {
    totalItems:number,
    items:{
        tituloArticulo:string,
        text:string,
        publicationDate:number,
        user:string,
        username:string,
        article:string,
        lider:string,
        coordinador:string,
        gerente:string,
        director:string,
        categoria:string,
        cliente:string,
        pcrc:string,
        id:string
    }[]
}

export type changesReport = {
    totalItems:number,
    items:{
        articulo:string,
        articlecontent:string,
        category:string,
        cliente:string,
        pcrc:string,
        event:string,
        eventDate:number,
        previoustate:string,
        user:string,
        id:string
    }[]
}

@Injectable({
    providedIn: 'root'
})
export class ReportsApiService {

   
    constructor(private http: HttpClient) { }


    private endPoints = {
        getEvent: `${environment.endpoint}/api/reports/events`,
        getCount: `${environment.endpoint}/api/reports/count`,
        getViews: `${environment.endpoint}/api/reports/views`,
        getFullReport: `${environment.endpoint}/api/reports/fullreport`,
        getComments: `${environment.endpoint}/api/reports/comments`,
        getChanges: `${environment.endpoint}/api/reports/changes`,
        getComentario: `${environment.endpoint}/api/reports/comentario`,
        getChange: (idChange:string) => `${environment.endpoint}/api/reports/changes/${idChange}`,
        generarComment :(id) =>`${environment.endpoint}/api/reports/comentarios/generar/`+id,
        getReportPcrcLimit : () => `${environment.endpoint}/api/reports/bases/pcrc/limite`,
        cleanBase:() =>`${environment.endpoint}/api/reports/bases/pcrc/clean`,
        getReporteCambioData : `${environment.endpoint}/api/reports/cambio/data`,
        cleanCambio: () =>`${environment.endpoint}/api/reports/cambio/clean`,
    }

    // Consumir endpoints de descargas //

    getReportLecturaPcrc(fecha_ini,fecha_final,idpcrc,page){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/reports/lecturadescargar`,params,{ responseType: 'blob' });
    
    }

    getReportLecturaCategoriaPcrc(fecha_ini,fecha_final,idpcrc,page){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/reports/lecturacategoriadescargar`,params,{ responseType: 'blob' });
    
    }

    getReportComentarioPcrc(fecha_ini,fecha_final,idpcrc,page){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/reports/comentariodescargar`,params,{ responseType: 'blob' });
    
    }

    getReportComentarioCategoria(fecha_ini,fecha_final,id,page){
      
        let params = {
            id:id,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/reports/comentariocategoriadescargar`,params,{ responseType: 'blob' });
    
    }

    getReportBaseDatosPcrc(fecha_ini,fecha_final,idpcrc,page){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/reports/basedatosdescargar`,params,{ responseType: 'blob' });
    
    }

    getReportBaseDatosCategoriaPcrc(fecha_ini,fecha_final,id,page){
      
        let params = {
            id:id,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/reports/basedatoscategoriadescargar`,params,{ responseType: 'blob' });
    
    }

    getReportCambioPcrc(fecha_ini,fecha_final,idpcrc,page){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/reports/cambiodescargar`,params,{ responseType: 'blob' });
    
    }

    getReportCambioCategoria(fecha_ini,fecha_final,idpcrc,page){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/reports/cambiocategoriadescargar`,params,{ responseType: 'blob' });
    
    }

    getReportUsuarioPcrc(idpcrc,page){
      
        let params = {
            id:idpcrc,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/reports/usuariodescargar`,params,{ responseType: 'blob' });
    
    }

    getReportFinanciera(fecha_ini,fecha_final){
      
        let params = {
            fechaIn:fecha_ini,
            fechaFin:fecha_final
        }

        return this.http.post(`${environment.endpoint}api/reports/financieradescargar`,params,{ responseType: 'blob' });
    
    }

    getReportObligatorioPcrc(fecha_ini,fecha_final,idpcrc,page,usuario){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page,
            usuario:usuario
        }

        return this.http.post(`${environment.endpoint}api/reports/obligatoriodescargar`,params,{ responseType: 'blob' });
    
    }

    getReportObligatorioCategoria(fecha_ini,fecha_final,idpcrc,page,usuario,categoria){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page,
            usuario:usuario,
            idcategoria:categoria
        }

        return this.http.post(`${environment.endpoint}api/reports/obligatoriocategoriadescargar`,params,{ responseType: 'blob' });
    
    }

    getReportCuestionarioPcrc(fecha_ini,fecha_final,idpcrc,page){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/articles/cuestionariodescargar`,params,{ responseType: 'blob' });
    
    }

    getReportCuestionarioCategoria(fecha_ini,fecha_final,idpcrc,page){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}api/articles/cuestionariocategoriadescargar`,params,{ responseType: 'blob' });
    
    }

    getReportPreturnoPcrc(fecha_ini,fecha_final,idpcrc,page){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }
console.log(params)
        return this.http.post(`${environment.endpoint}api/preturno/preturnodescargar`,params,{ responseType: 'blob' });
    
    }

    // Finaliza bloque //

    // Consumir endpoints de tabla //

    getLecturaPcrc(fecha_ini,fecha_final,idarticulo,page){
        
        let params = {
            id:idarticulo,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }

        return this.http.post(`${environment.endpoint}/api/reports/lecturapcrc`,params);
    }

    getLecturacategoria(fecha_ini,fecha_final,idcategoria, page){
        let params = {
            id:idcategoria,
            fechaIn:fecha_ini,
            fechaFin:fecha_final,
            page:page
        }
       
        return this.http.post(`${environment.endpoint}/api/reports/lecturacategoria`,params);
    }

    getLecturaTotal(fecha_ini,fecha_final,idarticulo){
      
        let params = {
            id:idarticulo,
            fechaIn:fecha_ini,
            fechaFin:fecha_final
        }

        return this.http.post(`${environment.endpoint}/api/reports/lecturatotal`,params);
    }

    getLecturaCategoriaTotal(fecha_ini,fecha_final,idcategoria){
      
        let params = {
            id:idcategoria,
            fechaIn:fecha_ini,
            fechaFin:fecha_final
        }

        return this.http.post(`${environment.endpoint}/api/reports/lecturacategoriatotal`,params);
    }

    getComentarioPcrc(idpcrc, init, fin , page){
        const params = {
           id:idpcrc,
           fechaIn:init,
           fechaFin:fin,
            page:page
        }
        return this.http.post(`${environment.endpoint}/api/reports/comentariopcrc`, params)
   }

   getComentarioCategoria(id, init, fin , page){
    const params = {
       id:id,
       fechaIn:init,
       fechaFin:fin,
        page:page
    }
    return this.http.post(`${environment.endpoint}/api/reports/comentariocategoria`, params)
}

   getComentarioTotal(fecha_ini,fecha_final,idpcrc){
      
    let params = {
        id:idpcrc,
        fechaIn:fecha_ini,
        fechaFin:fecha_final
    }

    return this.http.post(`${environment.endpoint}/api/reports/comentariototal`,params);
    }

    getComentarioCategoriaTotal(fecha_ini,fecha_final,idpcrc){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final
        }
    
        return this.http.post(`${environment.endpoint}/api/reports/comentariocategoriatotal`,params);
        }

    getBasedatosPcrc(idpcrc, init, fin , page){
        const params = {
           id:idpcrc,
           fechaIn:init,
           fechaFin:fin,
            page:page
        }
        return this.http.post(`${environment.endpoint}/api/reports/basedatospcrc`, params)
   }

   getBasedatosCategoria(idpcrc, init, fin , page){
    const params = {
       id:idpcrc,
       fechaIn:init,
       fechaFin:fin,
        page:page
    }
    return this.http.post(`${environment.endpoint}/api/reports/basedatoscategoria`, params)
}

   getBaseDatosTotal(fecha_ini,fecha_final,idpcrc){
      
    let params = {
        id:idpcrc,
        fechaIn:fecha_ini,
        fechaFin:fecha_final
    }

    return this.http.post(`${environment.endpoint}/api/reports/basedatostotal`,params);
    }

    getBaseDatosCategoriaTotal(fecha_ini,fecha_final,idpcrc){
      
        let params = {
            id:idpcrc,
            fechaIn:fecha_ini,
            fechaFin:fecha_final
        }
    
        return this.http.post(`${environment.endpoint}/api/reports/basedatoscategoriatotal`,params);
        }

        getCambioPcrc(fecha_ini,fecha_final,id,page){
        
            let params = {
                id:id,
                fechaIn:fecha_ini,
                fechaFin:fecha_final,
                page:page
            }
    
            return this.http.post(`${environment.endpoint}/api/reports/cambiopcrc`,params);
        }
    
        getCambiocategoria(fecha_ini,fecha_final,idcategoria, page){
            let params = {
                id:idcategoria,
                fechaIn:fecha_ini,
                fechaFin:fecha_final,
                page:page
            }
           
            return this.http.post(`${environment.endpoint}/api/reports/cambiocategoria`,params);
        }
    
        getCambioTotal(fecha_ini,fecha_final,id){
          
            let params = {
                id:id,
                fechaIn:fecha_ini,
                fechaFin:fecha_final
            }
    
            return this.http.post(`${environment.endpoint}/api/reports/cambiototal`,params);
        }
    
        getCambioCategoriaTotal(fecha_ini,fecha_final,idcategoria){
          
            let params = {
                id:idcategoria,
                fechaIn:fecha_ini,
                fechaFin:fecha_final
            }
    
            return this.http.post(`${environment.endpoint}/api/reports/cambiocategoriatotal`,params);
        }

        getObligatorioPcrc( pcrc, fechaini, fechafinal,usuarios,page){
            const params = {
               
                pcrc,
                fechaini,
                fechafinal,
                usuarios,
                page
            }
          
            return this.http.post(`${environment.endpoint}/api/reports/obligatoriopcrc`,params)
        }
    
        getObligatorioCategoria( categoria, fechaini, fechafinal,usuarios,page,pcrc){
            const params = {
               
                categoria,
                fechaini,
                fechafinal,
                usuarios,
                page,
                pcrc
            }
            return this.http.post(`${environment.endpoint}/api/reports/obligatoriocategory`,params)
        }
    
        getObligatorioTotal( pcrc, fechaini, fechafinal,usuarios){
    
            const params = {
                pcrc,
                fechaini,
                fechafinal,
                usuarios
            }
            return this.http.post(`${environment.endpoint}/api/reports/obligatoriototal`,params)
        }
    
        getObligatorioCategoriaTotal( pcrc, fechaini, fechafinal,usuarios,categoria){
    
            const params = {
                pcrc,
                fechaini,
                fechafinal,
                usuarios,
                categoria
            }
            return this.http.post(`${environment.endpoint}/api/reports/obligatoriocategoriatotal`,params)
        }

        getPreturno(pcrc,fechaini,fechafin,page){
            let params = {
                fechaini:fechaini,
                fechafin:fechafin,
                id:pcrc,
                page:page
            }
          
            
            return this.http.post(`${environment.endpoint}/api/preturno/preturnopcrc`,params);
        }
    
        getPreturnoTotal(pcrc,fechaini,fechafin){
            
            let params = {
                id:pcrc,
                fechaIn:fechaini,
                fechaFin:fechafin
            }
    
            return this.http.post(`${environment.endpoint}/api/preturno/preturnototal`,params);
        }

    // Finaliza bloque //

    getEvent( event:posibleEvents, filters:{ filter:posibleFilterFields, value:string }[], from:string, to:string ):Observable<{ value:string }>{
        let params = {
            fromdate:from,
            todate:to,
            event:event
        }

        return this.http.post<{ value:string }>(this.endPoints.getEvent, { filters: filters } ,{ params:params, observe: "body" })
    }

    getCount( item:posibleItems, filters:{ filter:posibleFilterFields, value:string }[], date:string ):Observable<{ value:number }>{
        let params = { date : date, item: item }
        return this.http.post<{ value:number }>(this.endPoints.getCount, { filters: filters } ,{ params:params, observe: "body" })
    }

    getViews(date:number, filters:{ filter:posibleFilterFields, value:string }[], minDuration:number, maxDuration:number){
        let params = {
            date: date.toString(),
            minduration: minDuration.toString(),
            maxduration: maxDuration.toString()
        }

        return this.http.post<{ value:number }>(this.endPoints.getViews, { filters: filters } ,{ params:params, observe: "body" })
    }

    getFullReport( date:number, filters:{ filter:posibleFilterFields, value:string }[], from:number, to:number ){
        let params = {
            date:date.toString(),
            from:from.toString(),
            to: to.toString()
        }

        return this.http.post<report>(this.endPoints.getFullReport, { filters: filters } ,{ params:params, observe: "body" })
    }

    getComents( fecha_ini,fecha_final,idpcrc,idcategoria){
        let params = {
            ini:fecha_ini,
            fin:fecha_final,
            idpcrc:idpcrc,
            idcategoria:idcategoria
        }
      
        
        return this.http.post(`${environment.endpoint}/api/reports/comentario`,params);
    }

  

    resultadoCuestionario(fechaini,fechafin,idpcrc,page){
        let params = {
            idpcrc,
            fechaini,
            fechafin,
            page
        }
      
        
        return this.http.post(`${environment.endpoint}/api/articles/resultadoCuestionario`,params);
    }

    resultadocategoriaCuestionario(fechaini,fechafin,categoria,page){
        let params = {
            categoria,
            fechaini,
            fechafin,
            page
        }
      
        
        return this.http.post(`${environment.endpoint}/api/articles/resultadocategoriaCuestionario`,params);
    }

    getCuestionarioTotal(fechaini,fechafin,pcrc){
        let params = {
            pcrc,
            fechaini,
            fechafin
        }
      
        
        return this.http.post(`${environment.endpoint}/api/articles/cuestionariototal`,params);
    }

    getCuestionarioCategoriaTotal(fechaini,fechafin,categoria){
        let params = {
            categoria,
            fechaini,
            fechafin
        }
      
        
        return this.http.post(`${environment.endpoint}/api/articles/cuestionariocategoriatotal`,params);
    }

    getCambios(idarticulo,fecha_ini,fecha_final){

        let params = {
            ini:fecha_ini,
            fin:fecha_final,
            idarticulo:idarticulo
        }
       
        
        return this.http.post(`${environment.endpoint}/api/reports/cambio`,params);

    }

    getCambioLimit(id_base, fechaInicial, fechaFin, page){
        const params = {
            id:id_base,
            fechaIn:fechaInicial,
            fechaFin:fechaFin,
            page:page
        }
        return this.http.post(`${environment.endpoint}/api/reports/cambiolimit`,params)
    }

    getBases(idarticulo){

        let params = {
            idarticulo:idarticulo
        }
       
        return this.http.post(`${environment.endpoint}/api/reports/bases`,params);

    }

    getBasesCategory(idcategoria){

        let params = {
            idcategoria:idcategoria
        }
       
        return this.http.post(`${environment.endpoint}/api/reports/bases/category`,params);

    }

    getBasesPcrc(idpcrc){

        let params = {
            idpcrc:idpcrc
        }
       
        return this.http.post(`${environment.endpoint}/api/reports/bases/pcrc`,params);

    }

    getLectura(fecha_ini,fecha_final,idarticulo){

        let params = {
            id:idarticulo,
            fechaIn:fecha_ini,
            fechaFin:fecha_final
        }

        return this.http.post(`${environment.endpoint}api/reports/lectura`,params);

    }

    


    getUsuario(idpcrc,page){

        let params = {
            id:idpcrc,
            page:page
        }
       
      
        return this.http.post(`${environment.endpoint}/api/reports/usuariopcrc`,params);

    }

    getUsuarioTotal(idpcrc){

        let params = {
            id:idpcrc
        }
       
      
        return this.http.post(`${environment.endpoint}/api/reports/usuariototal`,params);

    }

    getLecturaCategory(fecha_ini,fecha_final,idarticulo){

        let params = {
            id:idarticulo,
            fechaIn:fecha_ini,
            fechaFin:fecha_final
        }
       
    
        
        return this.http.post(`${environment.endpoint}/api/reports/lectura/category`,params);

    }

    

    getChanges( dateFrom:number, dateTo:number, filters:{ filter:posibleFilterFields, value:string }[], from:number, to:number ){
        let params = {
            dateto: dateTo.toString(),
            datefrom: dateFrom.toString(),
            from: from.toString(),
            to : to.toString()
        }

        return this.http.post<changesReport>(this.endPoints.getChanges, { filters: filters } ,{ params:params, observe: "body" })
    }

    getChange(changeId:string){
        return this.http.get<changesReport['items'][0]>(this.endPoints.getChange(changeId),{ observe: "body" })
    }

    getCommentsPcrc(pcrc){
        return this.http.post(`${environment.endpoint}/api/reports/comentarios`, pcrc)
    }

    

    getCategoriaById(id){
        return this.http.get(`${environment.endpoint}/api/reports/categoria/${id}`)

    }

    getTotalArticulos(){
   
        return this.http.post(`${environment.endpoint}/api/reports/totalarticulos`,null);
        
    }

    getTotalVista(fecha_ini,fecha_final){

        let params = {
            ini:fecha_ini,
            fin:fecha_final
        }
   
        return this.http.post(`${environment.endpoint}/api/reports/totalvistas`,params);
        
    }

    getTotalVistaLImit(ini, fin , page){
       const param = {
            ini,
            fin,
            page
       }
       return this.http.post(`${environment.endpoint}/api/reports/totalvistaslimit`, param)
    }


    getTotalConsolidado(fechaInicial, fechaFin){
        const params = {
           inicial:fechaInicial,
           final:fechaFin
        }
        return this.http.post(`${environment.endpoint}/api/reports/financiera/`, params)
    }

   /*  getObligatorioLimit( articulo, fechaini, fechafinal,usuarios){
    } */
    getTotalConsolidadoLimit(fechaInicial,fechaFin, limit, page){
        const data = {
            incial:fechaInicial,
            final:fechaFin
        }

       const params = new HttpParams()
          .set('limit',limit)
          .set('page',page)

        return this.http.post(`${environment.endpoint}/api/reports/financieralimit`, data,{params})
    }


   

    getCleanReportLectura(){
        return this.http.get(`${environment.endpoint}api/reports/lectura/clean`); 
    }

    getReportComentarioData(pcrc){
        return this.http.post(`${environment.endpoint}api/reports/comentarios/data`,pcrc)
    }

    getGenerarReporteComentario(id){
        return this.http.get(this.endPoints.generarComment(id))
    }

    getReportBasePcrcLimit(idpcrc){
        let params = { idpcrc }
        return this.http.post(this.endPoints.getReportPcrcLimit(),params)
    }

    getCleanReporteBasePcrc(){
        return this.http.get(this.endPoints.cleanBase())
    }

    getReporteCambioData(idarticulo,fecha_ini,fecha_final){
        const params = {
           ini:fecha_ini,
           fin:fecha_final,
           idarticulo:idarticulo
        }
        return this.http.post(this.endPoints.getReporteCambioData,params)
    }

    getCleanReporteCambioData(){
        return this.http.get(this.endPoints.cleanCambio())
    }

    getCleanTotalConsolidado(){
        return this.http.get(`${environment.endpoint}/api/reports/financiera/clean`)
    }

    getRemoveCambio(id){
        const params = new HttpParams().set('id',id)
        return this.http.get(`${environment.endpoint}/api/reports/cambio/remove`,{params})
    }

    getRemoveLectura(id){
        const params = new HttpParams().set('id',id)
        return this.http.get(`${environment.endpoint}/api/reports/lectura/remove`,{params})
    }

    getRemoveComentario(id){
        const params = new HttpParams().set('id',id)
        return this.http.get(`${environment.endpoint}/api/reports/comentario/remove`,{params})
    }

    getRemoveBase(id){
        const params = new HttpParams().set('id',id)
        return this.http.get(`${environment.endpoint}/api/reports/base/remove`,{params})
    }

    getRemoveFinanciera(id){
        const params = new HttpParams().set('id',id)
        return this.http.get(`${environment.endpoint}/api/reports/financiera/remove`,{params})
    }

   


}