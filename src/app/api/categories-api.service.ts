import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type categoryRaw = {
    base_id: string;
    name: string;
    position: number;
    icon: string;
    parent_id?: string;
    id: string;
};

export type category = {
    id: string;
    name: string;
    position: number;
    icon: string;
    parent_id?: string;
    base_id: string;
    subcategories?: category[]
}

type addCategoryDTO = {
    name: string;
    position: number;
    icon: string;
    pcrc: string;
    group?: string
}

type updateCategoryDTO = {
    name: string;
    position: number;
    icon: string;
}

type queryStatus = 'finish'|'loading';

@Injectable({
    providedIn: 'root'
})
export class CategoriesApiService {

    constructor(private http: HttpClient) { }

    private endPoints = {
        getCategories: (idPcrc: string) => `${environment.endpoint}/api/pcrc/${idPcrc}/categories`,
        postCategory: `${environment.endpoint}/api/categories`,
        updateCategory: (idCategory: string) => `${environment.endpoint}/api/categories/${idCategory}`,
        deleteCategory: (idCategory: string) => `${environment.endpoint}/api/categories/${idCategory}`
    };

    getCategories(pcrcId: string):Observable<{ state: queryStatus, value?:categoryRaw[]}> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.get<categoryRaw[]>(this.endPoints.getCategories(pcrcId), { observe: "body" })
            }),
            map<categoryRaw[],{ state: queryStatus, value?:categoryRaw[]}>(categories => {
                return { state: "finish", value:categories }
            }),
            startWith({ state: "loading"})
        )
    }

    addCategory(category: addCategoryDTO): Observable<categoryRaw> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.post<categoryRaw>(this.endPoints.postCategory, category, { observe: "body" })
            })
        )
    }

    updateCategory(categoryId: string, category: updateCategoryDTO): Observable<{ status: string }> {
        return of(null).pipe(
            switchMap(val => {
                return this.http.put<{ status: string }>(this.endPoints.updateCategory(categoryId), category, { observe: "body" })
            })
        )
    }

    deleteCategory(categoryId,cedula): Observable<any> {

            const data= {categoryId,cedula}

            return this.http.post('/api/categories/eliminar', data)
        
    }

    breadcrumbCategory(idarticulo){

        const data= {idarticulo}

        return this.http.post('/api/categories/breadcrumbcategoria', data)
    
}

}
