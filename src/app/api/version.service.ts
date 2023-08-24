import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { startWith, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VersionApiService {

    constructor(private http: HttpClient) { }

    private endPoints = {
        getVersion: `${environment.endpoint}/api/version/front`,
    }

    getFrontVersion() {
        return this.http.get<{ version: string }>(this.endPoints.getVersion, { observe: "body" })        
    }

}