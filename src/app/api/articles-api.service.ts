import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from '../article';
import { switchMap, concatMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type postArticleDTO = {
    title: string;
    content: string;
    obj:string;
    tags: string[];
    resume?: string;
    attached: string[];
    role: string;
    category: string;
    state: '1'|'2';
}

@Injectable({
    providedIn: 'root'
})
export class ArticlesApiService {

    constructor(private http: HttpClient) { }

    private endPoints = {
        getArticles:`${environment.endpoint}/api/articles`,
        postArticle:`${environment.endpoint}/api/articles`,
        postArticleRequired:`${environment.endpoint}/api/articles/required`,
        getCategoryArticles: (idCategory:string) => `${environment.endpoint}/api/categories/${idCategory}/articles`,
        getPcrcArticles: (idPcrc:string) => `${environment.endpoint}/api/pcrc/${idPcrc}/articles`,
        getPcrcArticulosObligatorios: (idPcrc:string,documento) => `${environment.endpoint}/api/pcrc/${idPcrc}/${documento}/articulosObligatorios`,
        deleteArticle: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}`,
        getArticle: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}`,
        updateArticle: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}`,
        postFavorite: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/favorites`,
        deleteFavorite: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/favorites`,
        postLike: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/likes`,
        deleteLike: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/likes`,
        postDisLike: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/disLikes`,
        deleteDisLike: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/disLikes`,
        getSelfFavorites: `${environment.endpoint}/api/users/me/favorites`,
        postArticleView: (idArticle:string) => `${environment.endpoint}/api/articles/${idArticle}/views`,
    }

    //PDF SERVICE
    articlePdfExporter(idArticle: string) {
        const url = `${environment.endpoint}/api/articles/pdf/${idArticle}`;
        return this.http.get(url, {responseType: "blob"});
      }

    getArticles(): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoints.getArticles, { observe: "body" })
            })
        )
    }

    getArticlesByCategory(categoryId: string, state:postArticleDTO["state"] = '1' , from:number = 0, size:number = 10, query?:string): Observable<Article[]> {

        if(!!query){
            return of(null).pipe(
                switchMap(val => {
                    return this.http.get<Article[]>(this.endPoints.getCategoryArticles(categoryId), { params: { from: from.toString(), size: size.toString(), state: state, query:query }, observe: "body" })
                })
            )
        } else {
            return of(null).pipe(
                switchMap(val => {
                    return this.http.get<Article[]>(this.endPoints.getCategoryArticles(categoryId), { params: { from: from.toString(), size: size.toString(), state: state }, observe: "body" })
                })
            )
        }

    }

    getArticlesByQuery(idPcrc: string, state:postArticleDTO["state"] = '1' , from:number = 0, size:number = 10, query:{ tag: string } | { query: string } ): Observable<Article[]> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article[]>(this.endPoints.getPcrcArticles(idPcrc), { params: { from:from.toString(), size:size.toString(), state:state, ...query }, observe: "body" })
            })
        )
    }

    getArticlesByUpdate(idPcrc: string, from:number = 0, size:number = 10): Observable<Article[]> {
        return this.http.get<Article[]>(this.endPoints.getPcrcArticles(idPcrc), 
        { params: { from:from.toString(), size:size.toString(), orderby:'update' }, observe: "body" })
    }

    getArticlesByViews(idPcrc: string, from:number = 0, size:number = 10): Observable<Article[]> {
        
        return this.http.get<Article[]>(this.endPoints.getPcrcArticles(idPcrc), { params: { from:from.toString(), size:size.toString(), orderby:'views' }, observe: "body" })
    }

    getArticulosObligatorios(idPcrc,documento, from:number = 0, size:number = 10): Observable<Article[]> {
        return this.http.get<Article[]>(this.endPoints.getPcrcArticulosObligatorios(idPcrc,documento), { params: { from:from.toString(), size:size.toString(),documento:documento }, observe: "body" })
    }

    deleteArticle(id)  {
        return this.http.delete(this.endPoints.deleteArticle(id) , { observe: "body" })
    }

    postArticle(article:postArticleDTO, done, validad):Observable<Article>{
        const articulo = {...article, done, validad}
        return this.http.post<Article>(this.endPoints.postArticle, articulo , { observe: "body" })
    }

    postArticleRequired(idarticulo,idpcrc,fechainicial,fechafinal,title,active){
        const articulorequired = {idarticulo, idpcrc, fechainicial,fechafinal,title,active}
        return this.http.post('/api/articles/required', articulorequired)
    }

    verifyRequired(idarticulo,cedula){
        const articulorequired = {idarticulo,cedula}
        return this.http.post('/api/articles/requiredverify', articulorequired)
    }

    verifyRequiredFecha(idarticulo){
        const articulorequired = {idarticulo}
        return this.http.post('/api/articles/requiredverifyfecha', articulorequired)
    }

    verifyArticleJarvis(idarticulo){
        const articulorequired = {idarticulo}
        return this.http.post('/api/articles/verifyarticlesjarvis', articulorequired)
    }

    verifyRequiredjarvis(cedula){
        const articulorequired = {cedula}
        return this.http.post('/api/articles/requiredverifyjarvis', articulorequired)
    }

    viewArticleRequired(id_articulo,cedula){
        const viewarticulorequired={id_articulo,cedula}
        return this.http.post('/api/articles/viewrequired', viewarticulorequired)
    }

    active(id_articulo,cedula){
        const viewarticulorequired={id_articulo,cedula}
        return this.http.post('/api/articles/active', viewarticulorequired)
    }

    searchArticleRequired(buscar){
        const viewarticulorequired={buscar}
        return this.http.post('/api/articles/buscarequired', viewarticulorequired)
    }

    editarperiodo(inicial,final,titulo,id){
        const viewarticulorequired={inicial,final,titulo,id}
        return this.http.post('/api/articles/editarperiodo', viewarticulorequired)
    }
    
    getArticulosObligatoriosEdit(id){
        const viewarticulorequired={id}
        return this.http.post('/api/articles/getobligatorioedit', viewarticulorequired)
    }

    validaRespuestas(respuestas){
        const respuesta={respuestas}
        return this.http.post('/api/articles/validarespuestas', respuesta)
    }

    tablaobligatorio(){
        return this.http.get('/api/articles/tablarequired/obligatorios')
    }

    obtenerpreguntas(id_obligatorio){
        const obligatorio={id_obligatorio}
        return this.http.post('/api/articles/obtenerpreguntas', obligatorio)
    }

    totalArticleRequired(id_pcrc,cedula){
        const totalarticulorequired={id_pcrc,cedula}
        return this.http.post('/api/articles/totalrequired', totalarticulorequired)
    }

    cuestionarioValidar(id_articulo,cedula){
        const datos={id_articulo,cedula}
        return this.http.post('/api/articles/validarCuestionario', datos)
    }

    guardarCuestionario(id_articulo,cedula){
        const datos={id_articulo,cedula}
        return this.http.post('/api/articles/guardarCuestionario', datos)
    }

    guardarPreguntas(idobligatorio,preguntas,respuestas){
        const datos={idobligatorio,preguntas,respuestas}
        return this.http.post('/api/articles/guardarPreguntas', datos)
    }

    habilitarobligatorio(idarticulo){
        const datos={idarticulo}
        return this.http.post('/api/articles/habilitarobligatorio', datos)
    }

    guardarResultado(id_articulo,cedula,respuestas){
        const datos={id_articulo,cedula,respuestas}
        return this.http.post('/api/articles/guardarResultado', datos)
    }

    getArticle(articleId:string): Observable<Article> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<Article>(this.endPoints.getArticle(articleId), { observe: "body" })
            })
        )
    }

    updateArticle(articleId:string, article:postArticleDTO):Observable<{ status: string }>{
        return this.http.put<{ status: string }>(this.endPoints.updateArticle(articleId), article , { observe: "body" })
    }

    postFavorite(articleId:string):Observable<{favoritos:number}>{
        return this.http.post<{favoritos:number}>(this.endPoints.postFavorite(articleId), null , { observe: "body" })
    }

    postLike(articleId:string):Observable<{ likes:number, dislikes:number }>{
        return this.http.post<{ likes:number, dislikes:number }>(this.endPoints.postLike(articleId), null , { observe: "body" })
    }

    postDisLike(articleId:string):Observable<{ likes:number, dislikes:number }>{
        return this.http.post<{ likes:number, dislikes:number }>(this.endPoints.postDisLike(articleId), null , { observe: "body" })
    }

    getSelfFavorites(from:number, size:number, pcrcId:string): Observable<Article[]> {
        return this.http.get<Article[]>(this.endPoints.getSelfFavorites, { params: { from: from.toString(), size: size.toString(), pcrc:pcrcId }, observe: "body" })
    }

    postArticleView(articleId:string ,initialDate:number, finalDate:number )  {

        let body = {
            initialDate:initialDate,
            finalDate:finalDate
        }

        return this.http.post<{status:string}>(this.endPoints.postArticleView(articleId), body , { observe: "body" })
    }

    getCliente(){

        return this.http.post('/api/articles/getcliente','')

    }

    

    getPcrc(idpcrc){

        return this.http.post('/api/articles/getpcrc',{idpcrc})

    }

    cambioarticulo(id_articulo,base,categoria){
        const cambio={id_articulo,base,categoria}
        return this.http.post('/api/articles/cambiararticulo', cambio)
    }

    mostrarcontrolcambio(id_articulo){
        const cambio={id_articulo}
        return this.http.post('/api/controlcambios/mostrarcontrolcambio', cambio)
    }

    mostrarcambio(id_cambio){
        const cambio={id_cambio}
        return this.http.post('/api/controlcambios/mostrarcambio', cambio)
    }

    selectcambio(id_articulo){
        const cambio={id_articulo}
        return this.http.post('/api/controlcambios/selectcambio', cambio)
    }

    accionbusqueda(busqueda){
        const data={busqueda}
        return this.http.post('/api/articles/accionbusqueda', data)
    }
    
}